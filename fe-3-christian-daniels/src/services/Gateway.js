import { baseUrl, gatewayEPs, pollLimit } from "../config/config.json";
import Socket from "./Socket";

async function getReport(response) {
  let noContent = 204;

  if (response.status !== noContent)
    return response;

  const props = {
    headers: {
      transaction_id: response.headers["transaction_id"]
    },
    baseURL: baseUrl,
    url: gatewayEPs.reportEP,
  };

  for (let i = 0; i < pollLimit; i++) {
    const response = await Socket.GET(props);

    if (response.status !== noContent) {
      /************************************************
            TODO More Robust checking for response
      ************************************************/

      return response;
    } else await timeOut();
  }


  /************************************************
        TODO Better missing response management
  ************************************************/
  return undefined;
}

// Had to increase the polling timeout
async function timeOut() {
  return new Promise(resolve => {
    let pollingTimeoutMilliSeconds = 1000;
    setTimeout(() => resolve(), pollingTimeoutMilliSeconds);
  });
}

export default {
  getReport,
};