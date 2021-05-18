const citiesList = document.querySelector('ul.cities-list');

ymaps.ready(init3);
function init3() {

    showCitiesList();

    function showCitiesList() {
        const allCountriesItem = document.querySelectorAll('ul.countries-list li');
        for( let countryItem of allCountriesItem){

            countryItem.addEventListener('click', function() {

                while(citiesList.firstChild){
                    citiesList.removeChild(citiesList.firstChild);
                }

                for( let cityName of Object.entries(country[countryItem.innerText])){

                    let citiesItem = document.createElement('li');
                        citiesList.append(citiesItem);

                    let openSpoiler = document.createElement('div');
                        openSpoiler.className = "open-spoiler";
                        citiesItem.append(openSpoiler);

                    let spoilerTitle = document.createElement('p');
                        spoilerTitle.className = "spoiler-title";
                        spoilerTitle.innerHTML = cityName[0];
                        openSpoiler.append(spoilerTitle);

                    for( let office of Object.values(cityName[1].offices)){
                        
                        let citiesSpoiler = document.createElement('div');
                        citiesSpoiler.className = "spoiler-container";
                        citiesItem.append(citiesSpoiler);

                        let officeName = document.createElement('p');
                            officeName.className = "office-name";
                            officeName.innerText = 'Офис '+office.name;
                            citiesSpoiler.append(officeName);

                        let managerName = document.createElement('p');
                            managerName.className = "manager-name";
                            managerName.innerText = office.managerName;
                            citiesSpoiler.append(managerName);

                        let phoneContainer = document.createElement('div');
                            phoneContainer.className = "phone-container";
                            citiesSpoiler.append(phoneContainer);

                        let phone1 = document.createElement('span');
                            phone1.innerText = office.telephone1;
                            phoneContainer.append(phone1);

                        let phone2 = document.createElement('span');
                            phone2.innerText = office.telephone2;
                            phoneContainer.append(phone2);

                        let managerMail = document.createElement('p');
                            managerMail.classList = "manager-mail";
                            managerMail.innerText = office.managerMail;
                            citiesSpoiler.append(managerMail);    


                        //развернуть офисы
                        openSpoiler.addEventListener('click', function(){
                            spoilerTitle.classList.add('spoiler-title-show');
                            citiesSpoiler.classList.toggle('spoiler-show');
                        });


                        //При клике на спойлер показывается объект
                        citiesSpoiler.addEventListener('click', function(){

                            map.setCenter(office.coordinates);
                            map.setZoom(12);

                            let clusterObjects = clusterer.getGeoObjects();
                            for( let geoObj of clusterObjects){
                                if(geoObj.geometry.getCoordinates() == office.coordinates){
                                    geoObj.balloon.open(map.getCenter());   
                                } 
                            }
                        });

                    }    
                    
                }
            });
        }
    }
}