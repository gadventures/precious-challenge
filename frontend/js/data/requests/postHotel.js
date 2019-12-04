export const postHotel = (data) => {
    //Post the hotel onbject to the db
    fetch('/api/hotels', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
        .then(rawData => rawData.json())
        .then(
            body => {
                //Backend form validation                
                if (!body.errors) {
                    window.location.reload();  
                }
                else {
                    console.log(body.message)
                }
            }
        )
        .catch(error => console.error(error));
}