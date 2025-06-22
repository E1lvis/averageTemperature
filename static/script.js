let currentDate = new Date();
let weatherGradients = {
    'clearday': 'to bottom, #FD8112, #0085CA',
    'clearnight': 'to bottom, #005C97, #363795',
    'pcloudyday': 'to bottom, #ECE9E6, #FFFFFF',
    'pcloudynight': 'to bottom, #ECE9E6, #FFFFFF',
    'mcloudyday': 'to bottom, #BDBBBE, #9D9EA3',
    'mcloudynight': 'to bottom, #BDBBBE, #9D9EA3',
    'cloudyday': 'to bottom, #BDBBBE, #9D9EA3',
    'cloudynight': 'to bottom, #BDBBBE, #9D9EA3',
    'humidday': 'to bottom, #005C97, #363795',
    'humidnight': 'to bottom, #005C97, #363795',
    'lightrainday': 'to bottom, #4E54C8, #8F94FB',
    'lightrainnight': 'to bottom, #4E54C8, #8F94FB',
    'oshowerday': 'to bottom, #4E54C8, #8F94FB',
    'oshowernight': 'to bottom, #4E54C8, #8F94FB',
    'ishowerday': 'to bottom, #4E54C8, #8F94FB',
    'ishowernight': 'to bottom, #4E54C8, #8F94FB',
    'lightsnowday': 'to bottom, #E6DADA, #274046',
    'lightsnownight': 'to bottom, #E6DADA, #274046',
    'rainday': 'to bottom, #4E54C8, #8F94FB',
    'rainnight': 'to bottom, #4E54C8, #8F94FB',
    'snowday': 'to bottom, #E6DADA, #274046',
    'snownight': 'to bottom, #E6DADA, #274046',
    'rainsnowday': 'to bottom, #E6DADA, #274046',
    'rainsnownight': 'to bottom, #E6DADA, #274046'
}


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

                let weather = values.weather
                div.style.setProperty('--gradient', `${weatherGradients[weather]}`);
                //style, setting the variables inside the css file
                //div.style.setProperty('--offset', `-${i*2}vw`);
                //div.style.setProperty('--depth', `-${i*40}px`);
                //div.style.setProperty('--scale', `${1-(i*0.05)}`);
                
                currentDate = new Date()
                currentDate.setDate(currentDate.getDate() + i) ;
                //adding content
                div.innerHTML = `<p>${currentDate.toDateString()}</p>
                                <p>${weatherTypeReturn(values.weather)}</p>
                                <p>Current Average Temperature</p>
                                <p>${values.currentAverage}<p>
                                <p>Last Year Average Temperature</p>
                                <p>${values.offsetAverage}</p>`;

                container.appendChild(div);

                
            });
            //inline version, can also just create h2, assign ineer, then append instead of inline
            document.getElementById('location').appendChild(
                Object.assign(document.createElement('h2'), {innerHTML: 'Using your location'})
            );
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

                let weather = values.weather
                div.style.setProperty('--gradient', `${weatherGradients[weather]}`);

                //style, setting the variables inside the css file
                //div.style.setProperty('--offset', `-${i*2}vw`);
                //div.style.setProperty('--depth', `-${i*40}px`);
                //div.style.setProperty('--scale', `${1-(i*0.05)}`);
                
                currentDate = new Date()
                currentDate.setDate(currentDate.getDate() + i) ;
                //adding content
                div.innerHTML = `<p>${currentDate.toDateString()}</p>
                                <p>${weatherTypeReturn(values.weather)}</p>
                                <p>Current Average Temperature</p>
                                <p>${values.currentAverage}</p>
                                <p>Last Year Average Temperature</p>
                                <p>${values.offsetAverage}</p>`;

                container.appendChild(div);

                
            });
            document.getElementById('location').appendChild(
                Object.assign(document.createElement('h2'), {innerHTML: 'Using Charlotte, NC'})
            );
        });
        })
} else {
    alert('Geolocation is not suppoerted by this browser')
}

function weatherTypeReturn(weather){
    let set1 = ['clearday', 'clearnight']
    let set2 = ['pcloudyday', 'pcloudynight', 'mcloudyday', 'mcloudynight', 'cloudyday', 'cloudynight']
    let set3 = ['lightrainday',  'lightrainnight', 'oshowerday', 'oshowernight', 'ishowerday', 'ishowernight', 'rainday', 'rainnight']
    let set4 = ['lightsnowday', 'lightsnownight', 'snowday', 'snownight', 'rainsnowday', 'rainsnownight']
    console.log(weather)
    console.log(weather in set1)
    switch (true) {
        case (set1.includes(weather)):
            return 'Clear'
            
        case (set2.includes(weather)):
            return 'Cloudy'
        case (set3.includes(weather)):
            return 'Rainy'
        case (set4.includes(weather)):
            return 'Snowy'

        default:
            return 'Unkown'
           
    }
    /*if (weather in set){
        return Clear
    }*/
    
}
   
  