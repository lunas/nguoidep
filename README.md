# README

This app just lists issues of the Nugoi Dep magazine and their pages, using a 
React front end. 

It also provides a ActiveAdmin backend to add issues and pages.

Page images are stored in an S3 bucket on aws.

## Development

* Ruby version: 2.6.5

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

### Setup

- as Postgresql superuser, create user `nguidep` and the database development and test 
  database:
  
      sudo su postgres # become postgres superuser 
      psql             # start db client
      # in psql: 
      CREATE ROLE nguoidep WITH LOGIN ENCRYPTED PASSWORD 'password';
      CREATE DATABASE nguoidep_development OWNER nguoidep;
      CREATE DATABASE nguoidep_test OWNER nguoidep;
      \q #             to exit
      
- Run migrations
  
      bundle exec rails db:migrate
      
- start rails:

      bundle exec rails s
      
- start webpack dev server in root directory:

      ./bin/webpack-dev-server
      
            
## Deployment instructions

Deployed on Hetzner, 159.69.218.80, running Ubuntu 18.04

Stack:  
see https://www.phusionpassenger.com/docs/tutorials/deploy_to_production/installations/oss/ownserver/ruby/apache/

- rbenv
- ruby: 2.6.5
- Rails
- ActiveAdmin for the admin interface
- React for the normal GUI to view issues and their pages
- Webserver: apache2
- App server: Phusion Passenger
- DB: the Postgresql instance running Gitlab: requires some special configuration, see below
- Capistrano
- AWS s3

To configure server for Passenger, Apache, follow these instructions:

  https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/ownserver/apache/oss/bionic/deploy_app.html#rails_login-to-your-server-create-a-user-for-the-app
          
### Production DB

Since on the production server, Gitlab is running, this app uses the Gitlab's 
Postgresql instance.

The app connects to Postgresql via the socket specified in Gitlab's configuration.
This socket address is also in `credentials.yml.enc` and read from their into
`database.yml`.

Should it ever change on the Hetzner server, adapt it in the `credentials.yml.enc`.

To access the DB on the production server directly, locally: 

     sudo gitlab-psql -d nguoidep_production
     
or via psql:

     psql -U nguoidep -d nguoidep_production -h [see path to socket in credentials]
### Apache config

The apache configuration file is in

     /etc/apache2/sites-enabled/nguoidep.hoatruong.com.conf
     
### To deploy using Capistrano  

  bundle exec cap production deploy

### Trouble shooting

When deploying, everything works up to the point where Passenger is restarted, and
you get

     03:05 passenger:restart
           01 passenger-config restart-app /var/www/nguoidep --ignore-app-not-running
           01 *** ERROR: Phusion Passenger doesn't seem to be running. If you are sure that it

Check whether passenger is running indeed:
 
     sudo passenger-memory-stats"
     
     # should display someting like:  
    
      ---------- Apache processes ----------
      PID    PPID   VMSize    Private  Name
      --------------------------------------
      15084  1      548.6 MB  7.3 MB   /usr/sbin/apache2 -k start
      18728  15084  550.9 MB  ?        /usr/sbin/apache2 -k start
      18729  15084  550.9 MB  0.0 MB   /usr/sbin/apache2 -k start
      18730  15084  550.9 MB  ?        /usr/sbin/apache2 -k start
      18731  15084  550.9 MB  ?        /usr/sbin/apache2 -k start
      18732  15084  550.9 MB  ?        /usr/sbin/apache2 -k start
      ### Processes: 6
      ### Total private dirty RSS: 7.36 MB (?)
      
      
      -------- Nginx processes --------
      
      ### Processes: 0
      ### Total private dirty RSS: 0.00 MB
      
      
      ----- Passenger processes -----
      PID    VMSize    Private  Name
      -------------------------------
      18704  390.0 MB  0.1 MB   Passenger watchdog
      18713  673.7 MB  0.2 MB   Passenger core

If no Passenger processes show up, try restarting Apache:

      sudo apache2ctl restart

