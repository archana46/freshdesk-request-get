$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
          var client = _client;
          client.events.on('app.activated',
            function() {
                client.data.get('ticket')
                    .then(function(data) {
                        console.log('data obtained:',data);
                        client.data.get('contact')
                        .then(function(archu){
                            console.log('data loaded:',archu);
                            var contactid= archu.contact.id;
                            var headers = {
                                "Authorization": "Basic cHJrbGh3a2RPOUkxZGxWR3l1Zw==",
                                "content-type": "application/json"
                            };
                            var options = {
                                headers: headers
                            }
                            var url = 'https://ducky.freshdesk.com/api/v2/contacts/'+ contactid ;
                            console.log('contactid url:', url);
                            client.request.get(url, options)
                            .then(function(ticketdata) {
                                // body...
                                console.log('ticketdata',ticketdata);
                                var ticketdataparse= JSON.parse(ticketdata.response);
                                console.log('ticketdataparse', ticketdataparse);
                                var phoneno= ticketdataparse.phone;
                                $('#apptext').append(phoneno);
                            },
                            function (ticketdataerr) {
                                // body...
                                console.log('ticketdataerr',ticketdataerr);
                            })

                        })
                        .catch(function(f){
                            console.log('Error -',f);
                        })
                        
                        // client.interface.trigger("showNotify", {type: "success", message: "sample notification"+ data.ticket.subject})
                        // client.interface.trigger("showModal", { title: "Sample Modal", template: "modal.html", data: {name: "James", email: "James@freshdesk.com"} })
                    })
                    .catch(function(e) {
                        console.log('Exception - ', e);
                    });
        });
    });
});
