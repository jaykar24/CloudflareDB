/** @type {any} Your Key to secure POST & DELETE requests with a token. null if allowed */
const KEY = 'love';

/** @type {any} Your Key to secure GET requests with a token. null if allowed */
const GETKEY = 'love';

/**
 * Handle the request
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    /** @type {string} Hostname of the worker */
    const host = request.headers.get("host");

    /** @type {string} Path of the request */
    const path = new URL(request.url).pathname;

    /**
     * Handle the request
     * @param {string} key Key to be searched from URL param
     * @return {string} Value of the key
     */
    function getUrlParam(key) {
      return new URL(request.url).searchParams.get(key);
    }

    switch (request.method) {
      case "OPTIONS": {
        /**  Handle Preflight */
        return jsonResponse({
          data: { msg: "Preflight request success 🤝" },
        });
      }
      case "POST": {
        /**  Handle POST */
        if (KEY && getUrlParam("key") !== KEY) {
          /**  Unauthorized */
          return jsonResponse({
            data: { status: false, msg: "Invalid key, Unauthorized!" },
            status: 403,
          });
        } else {
          /**  Authorized to save payload */

          /** @type {object} Request payload */
          var payload = await request.json();

          /** @type {object} Save and return payload */
          var save = await savePayload(payload);

          /**  Send response */
          return jsonResponse({
            data: {
              status: true,
              _id: save._id,
              query: `https://${host}/${save._id}`,
              data: save,
            },
          });
        }
      }
      case "GET": {
        /**  Handle GET */

        if (path === "/") {
          return jsonResponse({
            data: {
              status: "Running",
            },
          });
        } else {
          if (GETKEY && getUrlParam("key") !== GETKEY) {
            /**  Unauthorized */
            return jsonResponse({
              data: { status: false, msg: "Invalid key, Unauthorized!" },
              status: 403,
            });
          } else {
            /** @type {object} Retrive payload from ID */
            var getData = await JSONBASE.get(path.substring(1));
            if (getData) {
              return jsonResponse({
                data: JSON.parse(getData),
              });
            } else {
              return jsonResponse({
                data: {
                  status: false,
                  msg: "Not Found",
                },
                status: 404,
              });
            }
          }
        }
      }
      case "DELETE": {
        if (KEY && getUrlParam("key") !== KEY) {
          /**  Unauthorized */
          return jsonResponse({
            data: { status: false, msg: "Invalid key, Unauthorized!" },
            status: 403,
          });
        } else {
          /**  Authorized to delete payload */

          await JSONBASE.delete(path.substring(1));
          return jsonResponse({
            data: {
              status: true,
              msg: "Deleted Successfully",
            },
          });
        }
      }
      default: {
        /**  Handle unknown request */
        throw new Error("Invalid request method");
      }
    }
  } catch (error) {
    return jsonResponse({
      data: { status: false, msg: error.message },
      status: 500,
    });
  }
}

/**
 * Send a JSON response to the client
 *
 * @param {object} obj - Response
 * @param {any} obj.data - Body of the response
 * @param {number} obj.status - Status code of the response
 * @param {object} obj.headers - Headers of the response
 * @returns {Response}
 */
function jsonResponse({ data = null, status = 200, headers = {} }) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      ...headers,
    },
  });
}

/**
 * Send a JSON response to the client
 *
 * @param {Object} payload - Payload to be saved
 */
async function savePayload(payload) {
  if (!payload._id)
    payload._id =
      new Date().getTime() + Math.random().toString(36).substring(9);
  await JSONBASE.put(payload._id, JSON.stringify(payload));
  return payload;
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
