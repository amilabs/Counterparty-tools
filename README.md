# Сounterparty tools
Online tools developed to work with Counterparty transactions. 
Create, sign, and broadcast multisignature transactions with Counterparty Assets or bitcoins.

Operates with Mainnet and Testnet.

# Installation

Clone repository into separate webserver's directory and configure Apache vhost document root to the "web" directory of repo.
Make sure mod_rewrite is on and AllowOverride option is set to "All".
Copy cfg/config.tools.sample.php to cfg/config.tools.php and specify counterparty and bitcoind RPC addresses.
Use composer to install dependencies.