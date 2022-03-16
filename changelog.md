# Changes Description

## HW 5
While the Lighthouse report indicates no major issue in any of the metrics that are being used to measure overall score of site performance (with an average score above 90), I try to adapt further imporvements to improve upon it. These includes the following:

- Performance (previous: 92, current best: 100)
    - Convert a jpeg image to webp
    - Set explicit width and height to image elements
- Accessibilty (previous: 88, current best: 100)
    - Change color of experience card title p element
    - Change heading in home, about, and projects sections
- SEO (previous: 92, current best: 100)
    - Added meta description to index.html
    - Change slider arrows on project slides from a to span element

I also made some changes/adjustments to the design (beyond what mentioned above), and they are the following:
- Text color change to h3 elements on about and projects sections 
- Change background colors of home and experience sections
- Different sizing of profile picture in about section
- Change background color of sliders in projects section (project cards, arrows, slide numbers)
- Further djust width in projects section to make it fit better in different devices
- Animation on mobile view nav and toggle to close drop down on click
- Some modification in about me content

## HW 4
In this HW, I decided to make a slider/slideshow on the project section of my portfolio. To achieve this, I made some modifications slightly on the HTML file e.g., added new elements and class namings, and also the overall styling in the CSS file e.g., the way the project card displayed as a stack of "slides". Furthermore, I used window event listener to detect window dimension changes. The slider operates as follows:
- Click on either buttons to proceed or go back to previous slides (allows wrap around) to go to the desired project card
- Click on the slide number to go to the desired project card

I also preserved the previous styling, i.e., normal scrolling to the bottom layout in case JavaScript is not supported in the user's browser or if it is disabled. This is to ensure that content is being fully/properly displayed on the site.

The previous styling is also used for mobile view and other dimension where I think fits better with it to ensure there is no overlap between components on the website.

As far as third parrty script, I got inspired by one of the examples mentioned in the assignment description, which is adding a Google Analytics' script to my page. The reason I added this is to be more familiar with insights web tracking and such, in particular the specific actions that are being displayed in the analysis summary.