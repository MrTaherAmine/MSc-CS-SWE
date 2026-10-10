# Optional secondary deployment to a named public-cloud PaaS, e.g. Render.
# The primary release remains cPanel-compatible and is stored in web/.
FROM php:8.3-apache
RUN a2enmod headers \
 && sed -i 's/Listen 80/Listen 10000/' /etc/apache2/ports.conf \
 && sed -i 's/<VirtualHost \*:80>/<VirtualHost *:10000>/' /etc/apache2/sites-available/000-default.conf
COPY web/ /var/www/html/
EXPOSE 10000
CMD ["apache2-foreground"]
