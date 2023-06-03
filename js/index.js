
import { R_NUMBER_DATA } from "./r_number.js";

const NUMBER_DATA = document.querySelector('.number-data');
const GROUP_DATA = document.querySelector('.group-data');

function addDigitData(digits){
    const df = new DocumentFragment();
    for(const digit in digits){
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerText = `${digit}`
        const p1 = document.createElement('p');
        p1.innerText = `Appears`;
        const p2 = document.createElement('p');
        p2.innerText = `${digits[digit].total}`
        const p3 = document.createElement('p');
        p3.innerText = `times`;
        div.appendChild(h3);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        df.appendChild(div);
    }
    NUMBER_DATA.appendChild(df);
};
function addGroupData(groups){
    const df = new DocumentFragment();
    groups.forEach( group => {
        const p = document.createElement('p');
        p.innerText = group;
        df.appendChild(p);
    });
    GROUP_DATA.appendChild(df);
}

function addDataToPage(data){

    addDigitData(data.digits);
    addGroupData(data.groups);
};

function init(){
    
    addDataToPage(R_NUMBER_DATA);
};

init();