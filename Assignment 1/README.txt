Cole DiStasio
Computer Graphics I: Programming Assignment 1
2/22/21

In Programming Assignment 1 I took the provided JS and HTML files and edited them to change the images size, color and the number of dots shown. I found most of it to be simple but hit a few snags. I decided to create arrays to ajust the size and number of points. Then used a simple for loop with the index of the array being adjusted on each iteration. 
The most time consuming issue I had was that the loop would go to the end and only display the final iteration because there was no delay between loops. I was able to find this bit of code "await new Promise(r => setTimeout(r, 1000));" which adds a second of delay after each iteration where the image can be displayed before going to the next. 
The other problem I had was moving the JS code used for the fragment and vertex shader out of the HTML file. I was able to change the color of the points by editing the HTML but couldn't figure out how to make the RGB values into variables and then edit them in my loop. 
I was able to figure this out by looking at the initShaders() function and then using https://www.w3schools.com/html/html_scripts.asp I saw I could pretty much just copy and paste right into the JS code.

The only bug I can anticipate is if the Math.random() returns all zeros or some combination that results in a color too light to see it may look like it's displaying nothing even though it technically is. 