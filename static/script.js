let currentDate = new Date();
//let 
//using navigator geolaction built in to javascript, we'll need to handle no
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;


        fetch('/getInfo', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({latitude:lat, longitude: lon})
        })
        .then(res => res.json())
        .then(info => {
          
            const container = document.getElementById('mainContainer');

            Object.entries(info).forEach(([day, values], i) =>{
                const div = document.createElement('div');
                div.className = 'testDiv';

                
                
                //style, setting the variables inside the css file
                //div.style.setProperty('--offset', `-${i*2}vw`);
                //div.style.setProperty('--depth', `-${i*40}px`);
                //div.style.setProperty('--scale', `${1-(i*0.05)}`);
                
                currentDate = new Date()
                currentDate.setDate(currentDate.getDate() + i) ;
                //adding content
                div.innerHTML = `<p>${currentDate.toDateString()}</p>
                                <p>Current Average Temperature</p>
                                <h2>${values.currentAverage}</h2>
                                <p>Last Year Average Temperature</p>
                                <p>${values.offsetAverage}</p>`;

                container.appendChild(div);
            });
            
        });


    }, error =>{
            console.error('Geoloaction error:', error.message);

            fetch('/getInfo', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({latitude:34.92, longitude: -82.22})
        })
        .then(res => res.json())
        .then(info => {
          // in case of error we use static lat and lon
            const container = document.getElementById('mainContainer');

            Object.entries(info).forEach(([day, values], i) =>{
                const div = document.createElement('div');
                div.className = 'testDiv';

                
                
                //style, setting the variables inside the css file
                //div.style.setProperty('--offset', `-${i*2}vw`);
                //div.style.setProperty('--depth', `-${i*40}px`);
                //div.style.setProperty('--scale', `${1-(i*0.05)}`);
                
                currentDate = new Date()
                currentDate.setDate(currentDate.getDate() + i) ;
                //adding content
                div.innerHTML = `<p>${currentDate.toDateString()}</p>
                                <p>Current Average Temperature</p>
                                <h2>${values.currentAverage}</h2>
                                <p>Last Year Average Temperature</p>
                                <p>${values.offsetAverage}</p>`;

                container.appendChild(div);
            });
            
        });
        })
} else {
    alert('Geolocation is not suppoerted by this browser')
}



   
  