
import { R_NUMBER_DATA } from "./r_number.js";

const DATA_DISPLAY = {
    DETECTED_GROUPS: document.querySelector('.detected-groups'),
    TOTAL_DIGITS: document.querySelector('.total-digits'),
    TOTAL_NUMBERS: document.querySelector('.total-numbers'),
    CONTAINERS: {
        NUMBER_DATA: document.querySelector('.number-data'),
        GROUP_DATA: document.querySelector('.group-data')
    }
}

function addDigitData(numbers){
    
    const df = new DocumentFragment();
    for(const num in numbers){
        //if(numbers[num].total > 300){
            const div = document.createElement('div');
            const h3 = document.createElement('h3');
            h3.innerText = `${num}`
            const p1 = document.createElement('p');
            p1.innerText = `Appears`;
            const p2 = document.createElement('p');
            p2.innerText = `${numbers[num].total}`
            const p3 = document.createElement('p');
            p3.innerText = `times`;
            div.appendChild(h3);
            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(p3);
            df.appendChild(div);
        //}
    }
    DATA_DISPLAY.CONTAINERS.NUMBER_DATA.appendChild(df);
};
function addGroupData(groups){
    const df = new DocumentFragment();
    groups.forEach( group => {
        const p = document.createElement('p');
        p.innerText = group;
        df.appendChild(p);
    });
    DATA_DISPLAY.CONTAINERS.GROUP_DATA.appendChild(df);
};
function setTotalDigits(total){
    DATA_DISPLAY.TOTAL_DIGITS.innerText = `${total}`;
};
function setTotalDetectedGroups(total){
    DATA_DISPLAY.DETECTED_GROUPS.innerText = `${total}`;
};
function setTotalDetectedNumbers(total){
    DATA_DISPLAY.TOTAL_NUMBERS.innerText = `${total}`;
};
function addDataToPage(data){

    setTotalDetectedGroups(data.numberOfLines);
    setTotalDigits(data.totalNumbers);
    setTotalDetectedNumbers(Object.keys(data.numbers).length);
    addDigitData(data.numbers);
    addGroupData(data.groups);
};

function init(){
    
    addDataToPage(R_NUMBER_DATA);
};

init();