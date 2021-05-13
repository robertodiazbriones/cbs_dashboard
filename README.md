# cbs_dashboard
Used to deploy final Project Dashboard

    1. FINDING DATA
We chose to use bike sharing data from Washington D.C.'s Capital Bike Share: https://s3.amazonaws.com/capitalbikeshare-data/index.html.
We chose this dataset because it provided a large volume of data with information on weather patterns, date and time, geographic locations, and human behavior.
We downloaded all of the data for 2010-2020 and used these CSVs for our analyses and mappings in sklearn and Leaflet, respectively.

    2. CLEANING DATA
LINK TO OUR DATA CLEANING REPO:
https://github.com/robertodiazbriones/FinalProject.git

    3. ATTEMPTING MACHINE LEARNING
For this project we attempted to construct a machine learning model to predict city bike usage based on current weather conditions. In order to do so, we built a multi-variate linear regression model and trained it with our test dataset, "merged.csv". This dataset was created by merging "hour.csv" (a D.C. bikesharing dataset from 2011 through 2012 downloaded from Kaggle) and an API response from visualcrossing.com that returned historical D.C. weather conditions for 2011 through 2012. After merging the datasets, our model was trained to predict the count of casual bikeshare users based on the current temperature, humidity, precipitation, and real feel temperature, as these variables were found to be most correlated with usage. After training our model, we found the r-squared to be ~0.30, suggesting only about 30% prediction accuracy. This could be due to various factors, including scaling issues, choice of machine learning model, and overall level of correlation between the data and variable to predict.

    4. MAKING AN INTERACTIVE VISUALIZATION
~

    5. ASSEMBLING THE WHOLE DASHBOARD
Using data set from 2010-2019 bike stations to pinpoint locations on a Leaflet Map and the weather prediction is a tool that estimates casual bikeshare users based on current weather conditions. 
Link to dashboard: https://robertodiazbriones.github.io/cbs_dashboard/templates/

    6. MAKING A TABLEAU SUPPLEMENT
Given our lack of success with using sklearn to predict ridership based on weather patterns and seasons, we decided to try again with Tableau.
We wanted to see if we could uncover any relationships between the popularity of D.C.'s Bikeshare program and the passage of the years and the seasons.
Using Pandas in Jupyter Notebook, we merged all the CSVs for 2011-2014 inclusive into one CSV, then based a Tableau dashboard off of that dataset.
Our first Tableau visualization is a line graph displaying the increase in the total number of unique bike stations per month in D.C. between the start of 2011 and the end of 2014.
Our second Tableau visualization is a line graph displaying the total ride count per month in D.C. between the start of 2011 and the end of 2014, with line color dependent on the median trip duration, which was a field in the original Bikeshare datasets.
THE TABLEAU DASHBOARD LINK IS BELOW:
https://public.tableau.com/views/FinalProject_16207840572400/Dashboard1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link
