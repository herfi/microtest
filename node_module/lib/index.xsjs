function saveOrder(input) {
      
  return {
      body: {
      		input: input,
      		output: "Danke für die Nachricht"
      },
      status: $.net.http.CREATED
  };
}
var body = $.request.body.asString();
var inp = JSON.parse(body);

var result = saveOrder(inp);
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(result.body));
$.response.status = result.status; 