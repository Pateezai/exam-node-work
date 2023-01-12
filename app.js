async function shorten (){
    let og_url = document.getElementById("og_url").value;
    let custom_url = document.getElementById("custom_url").value;

    //catch url valid and empty?
    // if(!url){
    //     alert('Please put your url!!')
    // }
    //now its check valid value that user input but its require https too but we will gonna assign http or https automatic if its dont have
    function validateUrl(og_url) {
        if(og_url.startsWith("http://") || og_url.startsWith("https://")){
            return {
                valid : true,
                url: og_url
            };
        }else{
            return {
                valid : true,
                url: `http://${og_url}`
            };
        }
    }
    

    let validUrl = validateUrl(og_url);
    if(!validUrl.valid) {
        console.log(validUrl.error);
        return;
    } else {
        og_url = validUrl.url;
    }

    // let final_url = window.location.origin + '/' + custom_url;
    // final_element.innerHTML = '<a id="short-url" href="' + final_url + '">' + final_url + '</a>'
    //store and send data to serve-side
//check if custom_url already exists

    try{
        
        const response =  await fetch('/', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ og_url:og_url, custom_url:custom_url })
            // body: JSON.stringify({ og_url, custom_url, final_url }),

        })
        // console.log(JSON.stringify({ og_url, custom_url }))

        const data = await response.json();
        const is_custom_exist = data.custom_url
        if(is_custom_exist === undefined ){
            console.log("custom exists");
            return;
        }
        // console.log(data);
        // console.log( 'http://localhost/',typeof data.custom_url, data.custom_url);
        // console.log(`${window.location.origin}/${data.custom_url}`);
        // console.log(typeof data.og_url, data.og_url);
    //----

    }catch(error){
        console.log(error)
    }
    
}