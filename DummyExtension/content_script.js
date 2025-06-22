console.log("email is loaded date 21-6")

function createAiButton()
{
    const button =document.createElement('div');
    button.className='T-I J-J5-Ji aoO v7 T-I-at1 L3';
    button.style.margin="2px";
    button.style.padding="12px";
    button.innerHTML='AI reply';
    button.setAttribute('role','button');
    button.style.color = "white"; 
    button.style.bottom="2px";
    button.style.backgroundColor="#f28b82";
    button.style.borderRadius = "6px";   
    button.setAttribute('data-tooltip','Generate-ai-reply');
    return button;
}

function getEmailContent()
{
    const selectors=[
         '.a3s.aiL'
   ];
   for(const selector of selectors)
   {
      const content=document.querySelector(selector);
      if (content) {
           console.log("previous email  found 26 ");
            return content.innerHTML.trim();
        }
       
      
   }
   console.log("emailcontent  not found 32");

      return '';
}

function findComposeButton()
{
    const selectors=[
         '.btC',
         '.aDh',
         '[role="toolbar"]',
         '.gU.Up'
   ];
   for(const selector of selectors)
   {
      const toolbar=document.querySelector(selector);
      if(toolbar)
      {
        return toolbar;
      }
     
   }
    return null;
}



function injectButton(){
     
    const exitingButton= document.querySelector('.ai-reply-button');
    
    if(exitingButton)
        exitingButton.remove();


    const toolbar=findComposeButton();

    if(!toolbar)
    {
        console.log("Toolbar not found 69");
        return ;
    }
    

    console.log("Toolbar found over here 74 ");
    const button =createAiButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click',async() =>{
      try{
             button.innerHTML="generating....";
             button.disabled=true;
             const emailContent = getEmailContent();
             console.log("emailContent 90");
             console.log(emailContent);
             const response = await fetch("http://localhost:8080/api/email/generate",{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify(
                    {
                        emailContent:emailContent,
                        tone:"professional"
                    }
                )
             })
             if(!response.ok)
             {
                throw new Error("API request failed 98 ");
             }
             const generatedReply=await response.text();
             const composeBox=document.querySelector('[role="textbox"][g_editable="true"]')
             if(composeBox)
             {
                composeBox.focus();
                document.execCommand('insertText',false,generatedReply);
             }else{
                console.log("compose box was not found 107")
             }

              console.log("emailContent 118");
             console.log(emailContent);

      }catch(error)
      {
            alert("failed to generate the reply");
            console.log("catch the error failed the genrate the reply");
      }finally{
       button.innerHTML='Ai Reply';
       button.disabled=false;
      }


    });
    
    toolbar.insertBefore(button,toolbar.firstChild);

}


// const observer= new MutationObserver((mutations)=>{
//     for(const mutation of mutations){
//         const addedNodes= Array.from(mutation.addedNodes);

//         const hasComposeElements=addedNodes.some(node=>
//             node.nodeType==Node.ELEMENT_NODE && 
//             ( node.matches('.aDh,.btC,[role="dialog"],.I5')  || node.querySelector('.aDh,.btC,.I5 ,[role="dialog"]')) 
//         );
        
//           console.log("inside the mutation function ");
//         if(hasComposeElements)
//         {
//             console.log("compose window detected now ");
//             setTimeout(injectButton,500);
//         }

//     }
//      console.log("compose window detected 141 ");
// });

//  console.log("compose window detected 148 ");
        

function injectButton2() {
  console.log("injecting button...");
  // Your logic here
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(node =>
      node.nodeType === Node.ELEMENT_NODE &&
      (node.matches?.('.aDh,.btC,[role="dialog"],.I5') ||
       node.querySelector?.('.aDh,.btC,.I5,[role="dialog"]'))
    );

    if (hasComposeElements) {
      console.log("compose window detected now");
      setTimeout(injectButton, 500);
    }
  }
});

window.addEventListener('load', () => {
  console.log("observer started");
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});



