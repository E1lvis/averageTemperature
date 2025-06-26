const container = document.getElementById('currentTableBody');

const tr = document.createElement('tr');
//div.className = 'testDiv';



//style, setting the variables inside the css file
//div.style.setProperty('--offset', `-${i*2}vw`);
//div.style.setProperty('--depth', `-${i*40}px`);
//div.style.setProperty('--scale', `${1-(i*0.05)}`);



//adding content
tr.innerHTML = `<td>firstTest</td>
                <td class='infoText'>SecondTest</td>
                <td class='infoText'>SecondTest</td>`;

container.appendChild(tr);
