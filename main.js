
var main_page=window.location;
var list_items=[];
var span=document.getElementById("year");
span.innerText=`©️ ${new Date().getFullYear()} `;
const aelement=span.appendChild(document.createElement("a"));

aelement.innerText="Prakash78Blog";
aelement.setAttribute("href","https://prakash78blog.wordpress.com");



async function getVersion(){
    await fetch("https://api.github.com/repos/prax78/goodread/tags")
               .then(res=>res.json())
               .then(data=>
                {
                    document.getElementById("version").textContent=data[0].name??0;
                    
                })
               .catch(err=>console.log("unable to get the version"));
}
getVersion();
async function create_list(){
    await fetch(`${main_page}/data/src.json`)
    .then(res=>res.json())
    .then(json=>list_items=json)
    .catch(err=>{console.log(err);list_items=[]});

   let ul=document.getElementById("ul_list");
   if(list_items.length > 0){

    list_items.forEach(item=>{

       const li=ul.appendChild(document.createElement("li"));
       li.innerText=item.Title;
       li.onclick=(()=>loadContent(item.Sub_Title,item.File_Loc,item.Contributor_Email));
    });
   }else{
    ul.appendChild(document.createElement("li")).innerText="src.json is bad!!";
   }
   
    
}
async function loadContent(sub,loc,email) {

 let res_data=null;
  try{
    res_data= await fetch(`${main_page}${loc}`);
    if(res_data.status==200){
       
       res_data.text()
       .then(data=>document.getElementById("content-area").innerHTML=marked.parse(data));
      
    }else{
        document.getElementById("content-area").innerHTML="Error! fetching MD file!";
    }
  }catch{
        console.log("Error fetching MD file!");
  }   



document.getElementById("header").innerText=`${sub} - ${email.join(' & ')}`;           
    
}


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    let themeIcon = document.getElementById("theme-icon");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.src = "dark.png";
    } else {
        themeIcon.src = "light.png";
    }
}
