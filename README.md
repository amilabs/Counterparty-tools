# Сounterparty tools
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

Make sure your web server supports .htaccess and mod_rewrite.

Copy cfg/config.tools.sample.php to cfg/config.tools.php and specify counterparty and bitcoind RPC addresses.

Use composer to install dependencies.
```
php composer.phar install
```
