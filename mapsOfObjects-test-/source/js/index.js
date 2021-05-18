let map;
let countries = [];
let cities = [];
let offices = [];
let officesPos = [];
let citiesName = [];

ymaps.ready(init1);

function init1() {

    map = new ymaps.Map('mapID', {
        center: [62.145627, 65.433306],
        zoom: 3.5,
        controls: []
    });

    myCollection = new ymaps.GeoObjectCollection();

    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}</div>'
 );

    let clusterIcon = [{
        //iconLayout: 'default#image',
        href: "./img/Эллипс.png",
        size: [30,30],
        offset: 0
    }];

    clusterer = new ymaps.Clusterer({ 
        clusterDisableClickZoom: true,
        hasBalloon: false,
        clusterIcons: clusterIcon,
        clusterIconContentLayout: MyIconContentLayout
    });
        //получаем данные каждой страны
    countries = Object.values(country);

        //получаем данные города каждой страны
    cities = countries.map( (_country) => {
        return Object.values(_country);
    });
        //получаем офисы
        for( city of cities){
           let officesOfCountry = city.map( (_city) => {
                return _city.offices;
           });
           offices.push(officesOfCountry);
        }
    citiesName = countries.map( (_country) => {
        return Object.keys(_country);
    });
    // console.log(countries);
    // console.log(cities);
    // console.log(offices);
    
    //проходим по каждому офису каждого города всех стран и на основе координат
    //создаем новую метку офиса
    for( office of offices){
        for(_office of office)
        
        _office.forEach( (__office) => {

            let placemark = new ymaps.Placemark(__office.coordinates, null,
            {
                iconLayout: 'default#image',
	            iconImageHref: "./img/Эллипс.png",
	            iconImageSize: [20,20],
            });
            clusterer.add(placemark);

        });
        map.geoObjects.add(clusterer);
        
    }
}