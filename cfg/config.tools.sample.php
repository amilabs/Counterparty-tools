<?php
/**
 * Sample configuration.
 *
 * USAGE: Copy this file to "config.tools.php" and make changes.
 */


// Mainnet
$aMainnetServices = array(
    array(
        'counterpartyd' => array(
            'address' => 'http://user:password@node.address:4000',
        ),
        'bitcoind'      => array(
            'address' => 'http://user:password@node.address:8332',
        )
    )
);

// Testnet
$aTestnetServices = array(
    array(
        'counterpartyd' => array(
            'address' => 'http://user:password@node.address:14000',
        ),
        'bitcoind'      => array(
            'address' => 'http://user:password@node.address:18332',
        )
    )
);

$aConfig += array(
    'Template' => array(
        'Engine' => 'Smarty',
        'Options' => array(
             'force_compile'  => TRUE,
             'debugging'      => FALSE,
             'caching'        => FALSE,
             'cache_lifetime' => 120
        )
    ),
    'CryptoKit' => array(
        'layer'   => 'Counterparty',
        'testnet' => FALSE,
        'RPC'     => array(
            'services'          => $aMainnetServices,
            'services-testnet'  => $aTestnetServices,
        ),
    ),
);
