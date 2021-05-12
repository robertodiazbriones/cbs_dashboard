# cbs_dashboard
Used to deploy final Project Dashboard

    1. FINDING DATA
We chose to use bike sharing data from Washington D.C.'s Capital Bike Share: https://s3.amazonaws.com/capitalbikeshare-data/index.html.
We chose this dataset because it provided a large volume of data with information on weather patterns, date and time, geographic locations, and human behavior.
We downloaded all of the data for 2010-2020 and used these CSVs for our analyses and mappings in sklearn and Leaflet, respectively.

    2. CLEANING DATA
~

    3. ATTEMPTING MACHINE LEARNING
~

    4. MAKING AN INTERACTIVE VISUALIZATION
~

    5. ASSEMBLING THE WHOLE DASHBOARD
~

    6. MAKING A TABLEAU SUPPLEMENT
Given our lack of succes predicting ridership over time based on weather patterns and seasons, using sklearn, we decided to try again with Tableau.
We wanted to see if we could uncover any relationship between the popularity of D.C.'s Bikeshare program and the passage of the years and the seasons.
Using Pandas in Jupyter Notebook, we merged all the CSVs for 2011, 2012, 2013, and 2014 together into one CSV, then based a Tableau dashboard off of that dataset.
Our first Tableau visualization is a line graph displaying the increase in the total number of unique bike stations per month in D.C. between the start of 2011 and the end of 2014.
Our second Tableau visualization is a line graph displaying the total ride count per month in D.C. between the start of 2011 and the end of 2014, with line color dependent on the median length of trip, which was a field in the original Bikeshare datasets.
THE TABLEAU DASHBOARD LINK IS BELOW:
https://public.tableau.com/views/FinalProject_16207840572400/Dashboard1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link
