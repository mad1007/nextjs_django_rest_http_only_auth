app_name=app

rm -rf /var/log/$app_name/
rm -rf ./frontend/out/
rm ./backend/db.sqlite3
rm /etc/supervisor/conf.d/$app_name.conf
rm /etc/nginx/sites-available/$app_name.conf
rm /etc/nginx/sites-enabled/$app_name.conf
sudo apt purge nginx
sudo apt purge nodejs
sudo apt purge supervisor