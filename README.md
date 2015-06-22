# counterparty-tools
Online tools developed to work with Counterparty transactions. 
Create, sign, and broadcast multisignature transactions with Counterparty Assets or bitcoins.

Operates with Mainnet and Testnet.

# Installation

Clone repository into separate webserver's directory.
```
cd /var/www
mkdir cp-tools
git clone https://github.com/amilabs/counterparty-tools.git cp-tools
```

Configure Apache vhost document root to the "web" directory of repo.
```
<VirtualHost *:80>
    ServerName cp-tools.domain.name
    DocumentRoot /var/www/cp-tools/web
    <Directory "/var/www/cp-tools/web">
        AllowOverride All
        Options -Indexes
    </Directory>
</VirtualHost>
```
Make sure mod_rewrite is on and AllowOverride option is set to "All".

Copy cfg/config.tools.sample.php to cfg/config.tools.php and specify counterparty and bitcoind RPC addresses.

Use composer to install dependencies.
```
php composer.phar install
```
