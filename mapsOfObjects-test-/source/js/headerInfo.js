const countriesList = document.querySelector('ul.countries-list');

ymaps.ready(init2);

function init2() {

    for(let _country in country){
        countryItem = document.createElement('li');
        countryItem.innerHTML = _country;
        countriesList.append(countryItem);

        countryItem.addEventListener('click', (evt) => {
            evt.preventDefault();
            myCollection.removeAll();
            clusterer.removeAll();

            let mapCenter = [];
            let sumPos = [0,0];
            let _center = [];

            for(let city of Object.values(country[_country]) ){
                mapCenter.push(city.coordinates);
                for(let office of city.offices){
                    let placemark = new ymaps.Placemark(office.coordinates, {
                        balloonContent: [
                            '<div style="color:#FFFFFF;" class="balloon-content">',
                                '<p style="color:#FF9E00;" class="office-name">',office.name,'</p>',
                                '<p class="manager-name">',office.managerName,'</p>',
                                '<div class="office-phones">',
                                    '<span class="phone1">',office.telephone1,'</span>',
                                    '<span class="phone2">',office.telephone2,'</span>',
                                '</div>',
                                '<p style="color:#32B3E9;"class="manager-mail">',office.managerMail,'</p>',
                            '</div>'
                        ].join('')
                    },
                    {
                        iconLayout: 'default#image',
                        iconImageHref: "./img/Эллипс.png",
                        iconImageSize: [20,20],
                    });

                    placemark.events.add('click', function() {
                        map.setCenter(office.coordinates);
                        placemark.balloon.open(map.getCenter());
                    });
                    
                    clusterer.add(placemark);
                    
                }
            }
       
            map.geoObjects.add(clusterer);    
            map.setBounds(clusterer.getBounds());
        });
    }
}