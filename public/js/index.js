let socket = io();
socket.on('connect', function () {
    console.log('connected to server')
});

socket.on('newMessage', function(newMessage) {
    let formattedTime = moment(newMessage.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('locationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My Current Location</a>')

    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr('href', message.url);

    // li.append(a);
    // jQuery('#messages').append(li);
    let template = jQuery('#location-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
});

socket.on('disconnect', function () {
    console.log('disconnected from server')
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from:'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('')
    });
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...')
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
})