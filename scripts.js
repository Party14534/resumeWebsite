/*
var date = new Date();
var time = date.getHours();
async function getWeather(){
        let params = new URLSearchParams({
            access_key: "f683e5c587e3a67ef6146348c46dde45",
            query: "Richmond",
            units: "f"
        });
        let response = await fetch('http://api.weatherstack.com/current?access_key=f683e5c587e3a67ef6146348c46dde45&query=Richmond&units=f');
        console.log(response.json());
        return await response.json();
}
async function updateWeather(){
    let data = await getWeather();
    let temps = '';
    data.forEach(temp => {
        temps += "${temp.temperature}";
    })
}
updateWeather(); */




//PROJECT 1
const closedFace = document.querySelector('.closed');
const openFace = document.querySelector('.open');

// Add event listener
closedFace.addEventListener('mouseover', () => {
    if(openFace.classList.contains('open')){
        openFace.classList.add('active');
        closedFace.classList.remove('active');
    }
});
openFace.addEventListener('mouseleave', () => {
    if(closedFace.classList.contains('closed')){
        closedFace.classList.add('active');
        openFace.classList.remove('active');
    }
});


//PROJECT 2
let data = [
    {
        name: 'Zach',
        face: '👨🏽',
        age: '19'
    },
    {
        name: 'Elli',
        face: '👩🏻',
        age: '18'
    },
    {
        name: 'Anna',
        face: '👩🏽',
        age: '15'
    },
    {
        name: 'Seraphina',
        face: '🐶',
        age: '4'
    },
    {
        name: 'Rooster',
        face: '🐱',
        age: '1'
    },
    {
        name: 'Hen',
        face: '😼',
        age: '1'
    },
];

const info = document.querySelector('#info');

let details = data.map(function(item){
    return '<div>' + item.face + item.name + ' is ' + item.age + ' years old ' +
    '</div>';
    
});

info.innerHTML = details.join('\n');


//PROJECT 3
const circle = document.querySelector('#circle')

circle.addEventListener('mouseenter', () => {
    if(!circle.classList.contains('hover')){
        circle.classList.add('hover')
    }
})

circle.addEventListener('mouseleave', () => {
    if(circle.classList.contains('hover')){
        circle.classList.remove('hover')
    }
})