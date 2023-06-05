
import { R_NUMBER_DATA } from "./r_number.js";

const DATA_DISPLAY = {
    DETECTED_GROUPS: document.querySelector('.detected-groups'),
    TOTAL_DIGITS: document.querySelector('.total-digits'),
    TOTAL_NUMBERS: document.querySelector('.total-numbers'),
    CONTAINERS: {
        NUMBER_DATA: document.querySelector('.numbers'),
        GROUP_DATA: document.querySelector('.group-data')
    },
    SEARCH: {
        FORM: document.querySelector('.search-group_form'),
        INPUT: document.querySelector('.search-group_form'),
        SUBMIT_BTN: document.querySelector('.search-group_form'),
    }
}
function getNumberPlaces(num){
    let places;
    for(const prop in R_NUMBER_DATA.numbers){
        if(prop === num){
            places = [...R_NUMBER_DATA.numbers[prop].places]
        }
    }
    return places;
}
function selectNumbersInGroup({currentTarget}){
    const groups = [...document.querySelectorAll('.group')];
    const currentNumber = currentTarget.dataset.number;
    const numberIndexs = getNumberPlaces(currentNumber);
    const numberLength = currentNumber.length;

    // clear highlighted digits
    groups.forEach( group => {
        [...group.children].forEach( digit => {
            if(digit.classList.contains('highlight1')){
                digit.classList.remove('highlight1');
            }
        })
    })

    numberIndexs.forEach( position =>{
        const row = position[0];
        const col = position[1];
        const group = groups[row].querySelectorAll('.digit');

        for(let i = 0; i < numberLength; i++){
            group[col + i].classList.add('highlight1');
        }
    });
    
};
function addDigitData(numbers){
    
    const df = new DocumentFragment();
    for(const num in numbers){
        //if(numbers[num].total > 300){
            const div = document.createElement('div');
            div.dataset.number = num;
            div.setAttribute('tabindex', 0);
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
            div.addEventListener('click', selectNumbersInGroup);
            df.appendChild(div);
        //}
    }
    DATA_DISPLAY.CONTAINERS.NUMBER_DATA.appendChild(df);
};
function addGroupData(groups){

    const df = new DocumentFragment();
    groups.forEach( (group,index) => {
        const p = document.createElement('p');
        p.setAttribute('class', 'group');
        p.dataset.group = `${index}`;
        const len = group.length;
        for(let i = 0; i < len; i++){
            const span = document.createElement('span');
            span.setAttribute('class', 'digit');
            span.dataset.number = `${group[i]}`;
            span.innerText = group[i];
            p.appendChild(span);
        }
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

function searchForNumberInGroup(ev){
    ev.preventDefault();
    const searchQuery = ev.target.querySelector('.search-group_input').value;
    const queryLength = searchQuery.length;
    const groups = [...document.querySelectorAll('.group')];

    groups.forEach( group => {
        [...group.children].forEach( digit => {
            if(digit.classList.contains('highlight2')){
                digit.classList.remove('highlight2');
            }
        })
    });

    groups.forEach( group => {
        const digits = [...group.children];
        for(let i = 0; i < digits.length; i++){
            const digit = digits[i];
            const value = digit.dataset.number;
            if(value !== searchQuery[0]) continue;

            let countCheck = 0;
            for(let j = 0; j < queryLength; j++){
                const other = digits[i + j];
                if(!other) continue;
                if(other.dataset.number === searchQuery[j]) countCheck++;;
            }
            if(countCheck === queryLength){
                for(let j = 0; j < queryLength; j++){
                    digits[i + j].classList.add('highlight2');
                }
            }
        }
    });
}

function init(){
    
    addDataToPage(R_NUMBER_DATA);

    DATA_DISPLAY.SEARCH.FORM.addEventListener('submit', searchForNumberInGroup)
};

init();