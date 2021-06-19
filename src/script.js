// track element
let form = document.querySelector('form');
let input = document.querySelector('input');
let main = document.querySelector('main');

// url
const userURL = 'https://api.github.com/users/';

// add event listener on form
form.addEventListener('submit',event=>{
    event.preventDefault();

    const user =  input.value.trim();
    
    getUser(user);
})

function getUser(userName){
    fetch(userURL + userName)
    .then(res => res.json())
    .then(data=> {
        main.innerHTML = '';
        createUser(data);
    })
    .catch(error=>{
        main.innerHTML = '';
        userNotFound();
    })
}

// createUser function
function createUser(data){
    let {
        name,
        avatar_url : avatar,
        public_repos : repos,
        followers,
        following,
        location,
        bio
    } = data;

    let nameNotFound = 'anonymous';
    let locationNotFound = 'Location is not found';
    let bioNotFound = 'This person can not write his bio.Probably This person is not active in github or delete the account for some reason.';

    
    // const create div and push the contain about user
    const div = document.createElement('div');
    div.className = 'profile';

    div.innerHTML = `
    <!-- start div profile -->
            <!-- start img -->
            <div class="profile-avater">
                <img src="${avatar}" alt="${name}">
            </div>

            <!-- profile info -->
            <div class="profile-info">
                <h2>${name ? name : nameNotFound}</h2>
                <p>${location ? location : locationNotFound}</p>

                <p class="bio">${bio ? bio : bioNotFound}</p>

                <ul class="status">
                    <li>${followers} followers</li>
                    <li>${following} following</li>
                    <li>${repos} repos</li>
                </ul>

                <div class="repos">
                </div>
            </div>
            <!-- profile info end -->
        <!-- end div profile --> 
    `
    main.appendChild(div);

    addRepos(userName);
}

// userNotFound
function userNotFound(){
    let h1 = document.createElement('h1');
    h1.className = 'not-found';
    h1.innerText = '404 NOT FOUND';

    main.appendChild(h1);
}

function addRepos(userName){
    fetch(userURL + userName+'/repos?sort=created')
    .then(res => res.json())
    .then(data=>{
        
        data.slice(0,10).forEach(({html_url,name})=>{
            let span = document.createElement('span');
            let a = document.createElement('a');

            a.innerText = name;
            a.href = html_url;
            a.target = '_blank';
            span.appendChild(a);

            document.querySelector('.repos').appendChild(span);
        })
    })
    .catch(error=>{

    })
}
