/* Here  first  function is written and  reversed it  */
function palindromestr(str)
{

  var  store1 = str.split('');
  var  store2 = store1.reverse();
  var  palindromestr1  = store2.join('');

/* Always pass the data in return which we want to get output */
  return palindromestr1;

}

console.log(palindromestr('hello'))

/*  Here  palindrome  is checked   */

function checkpalindrome(str)
{
  var store22 = palindromestr(str)

 if(str === store22)
 {
   return true;
 }
 else
 {
  return false;
 }
 
}

console.log(checkpalindrome('mom'))
console.log(checkpalindrome('dad'))
console.log(checkpalindrome('momo'))

/* Convert  number to String is converted   */

/*  data is type of Input      */
 var data  = 
 {
   day :  2,
   month : 9,
   year : 2020,
 }
 
 /*  function  */
function convertostr(data)
 {
 /*  this is used to take input from user  */ 
 
 var datastr = { day :'', month : '', year: ''}
     
     
     if(data.day < 10)
     { 
         
          datastr.day = '0' + data.day;
         
     }
     else
     {
        /*  tostring converts number to string */
        datastr.day =  data.day.toString();
        
     }
      if(data.month < 10)
     { 
         
          datastr.month = '0' + data.month;
         
     }
     else
     {
        
        datastr.month=  data.month.toString();
        
     }
     
     datastr.year = data.year.toString();
     return datastr;
 }
console.log(convertostr(data))


/* Now get all the variations that can be possible for palindrome */


function findvariations(data)
{

 var variation =  convertostr(data);
 
 var mmddyyyy =  variation.month + variation.day + variation.year  ;
 var  ddmmyyyy =  variation.day + variation.month + variation.year ;
 var yyyymmdd =  variation.year + variation.month + variation.day ;
 var yymmdd = variation.year.slice(-2) + variation.month + variation.day  ;
 var mmddyy =  variation.month + variation.day + variation.year.slice(-2) ;
 var ddmmyy = variation.day + variation.month + variation.year.slice(-2) ;
 
 
 return [mmddyyyy,ddmmyyyy,yyyymmdd,yymmdd,mmddyy,ddmmyy];

}

console.log(findvariations(data))


/* In this combinly  checking is there any palindrome  in sequence of all 6 */

function checkpalindromeforallvar(data)
{

  var first =  findvariations(data);
  
  var flag = false;
  
  for(var i=0;i < first.length ;i++)
  {
    if(checkpalindrome(first[i]))
    {
         flag = true;
         break;
    }
  }
  return flag;
}

console.log(checkpalindromeforallvar(data))



 function isleapyear(year)
{
/* 400 is used for checking Leap Year */
      if(year % 400 === 0) 
     {   
        return true; 
     }
     /* for checking 100 it is not century year or not like 2100 ,3100 */
        if(year % 100 === 0) 
     {
        return false;
     }
      if(year % 4 === 0)  
     {
        return true;
     }
     return false;

}


 console.log(isleapyear(2020)) 

/* Here we are  incrementing the day & thrn acc. to given input in data setting the output 

like month == 2 is feb 
if days will increase what will happen 
if decrease then what will happen

*/

function getNextDate(data) {
  var day = data.day + 1;
  var month = data.month;
  var year = data.year;

/*   Here days in  months  are defined     */
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isleapyear(year)) {
      if (day > 29) { /* if day which is our input >29 then..*/
        day = 1;  /* increment write day =1*/
        month++; 
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
  /* Check  if day exceeds the max day in month */
    if (day > daysInMonth[month - 1])
    {
      day = 1;
      month++; /* increment month by 1 */
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}
console.log(getNextDate(data))

/*  here we find the next  palindrome and diff. between ur input and next date       */

function givepalindromedays(data)
{

    var ctr = 0; /* at start counter = 0 */
    var nextdate =   getNextDate(data); 
   
   while(1)
   {
      ctr++;
       var isthispalindrome =  checkpalindromeforallvar(nextdate); /* for every palindrome variation increment is done for all formats 
       By taking nextdate as paramter all the needed inc. & dec.  done acc.to that 
       */
       
        if(isthispalindrome)
        {
             break;
        }
         
        nextdate =   getNextDate(nextdate);
   }
   
     return[ctr,nextdate]

}

console.log(givepalindromedays(data))


var dateinput = document.querySelector('#bday-input');
var button = document.querySelector('#btn-one');
var firstnew = document.querySelector('#result');



function clickhandler(e)
{
       var storedata = dateinput.value;

       if(storedata  !== '')
       {

           var newdata = storedata.split('-');

            var date = 
            {
                   day: Number(newdata[2]), /* Most of the data is in number so we  convert to number */
                   month: Number(newdata[1]),
                   year:Number(newdata[0]),
            };  

             var ispalindrome =  checkpalindromeforallvar(date);
 
              if(ispalindrome)
                  {
                      firstnew.innerText = 'Your bday is Palindrome!!✔✔';
                  }
                  else
                  {
                    var [ctr, nextdate] =  givepalindromedays(date);



      firstnew.innerText = `The next palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}, you missed it by ${ctr} days! 😔`;
                   
                  
                  }
       }   
}


button.addEventListener('click',clickhandler)


