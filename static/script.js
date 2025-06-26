let currentDate = new Date();
let weatherGradients = {
    'clearday': 'to bottom, #FD8112, #0085CA',
    'clearnight': 'to bottom, #363795, #FD8112',
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
            //grab both table bodies
            const container = document.getElementById('currentTableBody');
            const pastContainer = document.getElementById('pastTableBody');

            Object.entries(info).forEach(([day, values], i) =>{
                  //each loop will create a new tr for both bodies 
                currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + i);

                const tr = document.createElement('tr');
                const pastTR = document.createElement('tr')
                tr.className = 'tableRow';
                pastTR.className = 'tableRow';

                let weather = values.weather
                //***** if we can set the gradient of the row do so */
                //tr.style.setProperty('--gradient', `${weatherGradients[weather]}`);
                //pastTR.style.setProperty('--gradient', `${weatherGradients[weather]}`);

                let dateData = document.createElement('td');
                dateData.textContent = currentDate.toDateString();
                
                
                let firstData = document.createElement('td');
                firstData.className = 'weatherText';
                firstData.textContent = weatherTypeReturn(values.weather);
                firstData.style.setProperty('--gradient', `${weatherGradients[values.weather]}`);
                
                let secondData = document.createElement('td');
                secondData.className = 'infoText';
                secondData.textContent = values.currentAverage;
                
                
                
                tr.appendChild(dateData);
                tr.appendChild(firstData);
                tr.appendChild(secondData);
                
                //**** rememnber the weather and data are wrong  */
                dateData.textContent = currentDate.toDateString();
                firstData.textContent = weatherTypeReturn(values.weather);
                secondData.textContent = values.offsetAverage;
                //adding content

                pastTR.appendChild(dateData);
                pastTR.appendChild(firstData);
                pastTR.appendChild(secondData);
                
                container.appendChild(tr);
                pastContainer.appendChild(pastTR);

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

            //grab both table bodies
            const container = document.getElementById('currentTableBody');
            const pastContainer = document.getElementById('pastTableBody');

            Object.entries(info).forEach(([day, values], i) =>{
               //each loop will create a new tr for both bodies 
                currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + i);

                const tr = document.createElement('tr');
                const pastTR = document.createElement('tr')
                tr.className = 'tableRow';
                pastTR.className = 'tableRow';

                let weather = values.weather
                

                let dateData = document.createElement('td');
                dateData.textContent = currentDate.toDateString();
                
                
                let firstData = document.createElement('td');
                firstData.className = 'weatherText';
                firstData.textContent = weatherTypeReturn(values.weather);
                firstData.style.setProperty('--gradient', `${weatherGradients[values.weather]}`);
                
                let secondData = document.createElement('td');
                secondData.className = 'infoText';
                secondData.textContent = values.currentAverage;
                
                
                
                tr.appendChild(dateData);
                tr.appendChild(firstData);
                tr.appendChild(secondData);
                container.appendChild(tr);
                
                //**** rememnber the weather and data are wrong  */
                let pastDateData = document.createElement('td');
                pastDateData.textContent = currentDate.toDateString();
                
                
                let pastFirstData = document.createElement('td');
                pastFirstData.className = 'infoText';
                pastFirstData.textContent = values.currentAverage
                
                
                let pastSecondData = document.createElement('td');
                pastSecondData.className = 'infoText';
                pastSecondData.textContent = values.offsetAverage;
                
                //adding content

                pastTR.appendChild(pastDateData);
                pastTR.appendChild(pastFirstData);
                pastTR.appendChild(pastSecondData);
                
               
                pastContainer.appendChild(pastTR);

                
            });
            //inline version, can also just create h2, assign ineer, then append instead of inline
            document.getElementById('location').appendChild(
                Object.assign(document.createElement('h2'), {innerHTML: 'Charlotte, NC'})
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
   
  