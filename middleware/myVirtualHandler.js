function myVirtualHandler(request, session, config) {
  // Set up a response object
  var response = {
    Body: "",
    Headers: {
      test: "virtual-header-1",
      "test-2": "virtual-header-2",
      "content-type": "application/json"
    },
    Code: 200
  };

  // Batch request
  var batch = {
    requests: [
      {
        method: "GET",
        headers: {
          "x-tyk-test": "1",
          "x-tyk-version": "1.2",
          authorization: "1925946e8fcc94e31ab6015a0d31839f1"
        },
        body: "",
        relative_url: "http://localhost:8080/commerce/"
      },
      {
        method: "GET",
        headers: {
          "x-tyk-test": "1",
          "x-tyk-version": "1.2",
          authorization: "11591bb3037cb4c64ba89374295d5651d"
        },
        body: "",
        relative_url: "http://localhost:8080/chatbot/"
      }
    ],
    suppress_parallel_execution: true
  };

  log("Debug");
  log(JSON.stringify());

  log("[Virtual Test] Making Upstream Batch Request");
  var newBody = TykBatchRequest(JSON.stringify(batch));

  // We know that the requests return JSON in their body, lets flatten it
  var asJS = JSON.parse(newBody);
  for (var i in asJS) {
    asJS[i].body = JSON.parse(asJS[i].body);
  }

  // We need to send a string object back to Tyk to embed in the response
  response.Body = JSON.stringify(asJS);

  return TykJsResponse(response, session.meta_data);
}
log("Batch Test initialised");
