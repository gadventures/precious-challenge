export const postTransportation = (data) => {
    fetch('/api/transportations', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
        .then(rawData => rawData.json())
        .then(
            body => {
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