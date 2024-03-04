const loadCard = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
  // console.log(res);
  const data = await res.json();
  const card = data.posts;
  //    console.log(card);


  displayCards(card);

}


const searchCard = async (text) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${text}`);
  // console.log(res);
  const data = await res.json();
  const card = data.posts;
  //    console.log(card);

  displayCards(card);

}

const displayCards = (cart) => {

  const container = document.getElementById('type-container');

  container.textContent = '';

  

  cart.forEach(cards => {

    //  console.log(cards);


    //  1. create a div
    const newDiv = document.createElement('div');

    newDiv.classList = `flex flex-col lg:flex-row gap-8 p-10 rounded-3xl bg-[#F3F3F5]`;
    // 2. set inner HTML
    newDiv.innerHTML = `
    <div class="w-[100px] h-[100px] relative">
                  <img  class="w-[100px] h-[100px] rounded-3xl " src="${cards.image}" alt="">
                  <div id="status" class="absolute -top-1 -right-1 w-6 h-6 rounded-full ${cards.isActive === true ? "bg-green-700" : "bg-red-700"}"></div>
                </div> 
                <div class="flex flex-col flex-grow gap-3">
                  <div class="flex flex-row gap-3 text-base font-medium">
                    <h1># ${cards.category}</h1> 
                    <h1>Author : <span>${cards.author.name}</h1>
                  </div>
                   <h1 class="text-xl font-bold">${cards.title}</h1>
                   <p class="text-base font-normal text-[#12132d99]">${cards.description}</p>
                   <div class="flex flex-row justify-between pt-6 border-t-2 border-dashed border-[#12132d40]">
                     <div class="flex flex-row gap-6">
                       <p class="flex flex-row gap-3"><img src="images/tabler-icon-message-2.png" alt=""> ${cards.comment_count}</p>
                       <p class="flex flex-row gap-3"><img src="images/Vector (4).png" alt=""> ${cards.view_count}</p>
                       <p class="flex flex-row gap-3"><img src="images/Vector (5).png" alt=""> ${cards.posted_time}</p>
                     </div>
                     <img onclick="detail('${cards.title.replace(/'/g, '@')}', '${cards.view_count}')" src="images/Vector (3).png" alt="">
                   </div>
                </div>

                    `;



    //    4. append child

    container.appendChild(newDiv);


  });

  // hide loading spinner 

  toggleLoading(false);

}

// handle search button

const handleSearch = () => {

  toggleLoading(true);
 
  const search = document.getElementById('search-field');
  const text = search.value;
  // console.log(text);
  searchCard(text);
 

}
const load = document.getElementById('loader');
const toggleLoading = (isLoading) => {

  if (isLoading) {
    load.classList.remove('hidden');
   
  } else {
    load.classList.add('hidden');
  }

}



let count = 0;
const detail = async (title, view) => {
  //  console.log();
  // load datas


  console.log(title, view);
  count++;

  setInnerText('count', count)
  show(title, view);
}




const show = (title, view) => {
  // console.log(data);

  const detail = document.getElementById('type-content');

  const newDiv = document.createElement('div');

  newDiv.classList = `flex justify-end justify-between  p-2 lg:p-4 bg-white rounded-3xl`;

  newDiv.innerHTML = ` <div>
        <h1 id='title' class="text-base font-semibold">${title.replace('@', "'")}</h1>
      </div>
      <div class="flex gap-3 items-center">
        <img class="h-4" src="images/Vector (4).png" alt="">
        <p id='view' class="text-base font-normal">${view}</p>
      </div>
        
            `;

  detail.appendChild(newDiv);
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

const latestCard = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
  // console.log(res);
  const data = await res.json();
  const card = data;
  console.log(card);
  displayLatest(card);

}

const displayLatest = (cart) => {

  const container = document.getElementById('latest');



  cart.forEach(cards => {

    //  console.log(cards);


    //  1. create a div
    const latestDiv = document.createElement('div');

    latestDiv.classList = `flex flex-col gap-4 p-6 border-2 border-solid border-[#30325e1a] rounded-2xl`;


    // 2. set inner HTML
    latestDiv.innerHTML = `
                <img class="rounded-2xl" src="${cards.cover_image}" alt="">
                <div class="flex flex-row gap-3">
                <img  src="images/Frame (5).png" alt="">
                <p id='date' class="text-[#12132d99] text-base font-normal">${cards.author.posted_date === undefined ? "No publish date" : cards.author.posted_date}</p>
                </div>
                <h1 class="text-lg font-extrabold">${cards.title}</h1>
                <p class="text-base font-normal text-[#12132d99]">${cards.description}</p>
                <div class="flex flex-row gap-2">
                  <img class="w-11 h-11 rounded-full" src="${cards.profile_image}" alt="">
                  <div class="flex flex-col gap-1">
                    <h1 class="text-base font-bold">${cards.author.name}</h1>
                    <p id="designation" class="text-sm font-normal">${cards.author.designation === undefined ? "Unknown" : cards.author.designation}</p>
                  </div>
                </div>
            
                                `;



    //    4. append child

    container.appendChild(latestDiv);


  });



}
latestCard();
loadCard();