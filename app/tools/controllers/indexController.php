<?php

use AmiLabs\DevKit\Controller;
use AmiLabs\CryptoKit\BlockchainIO;
use \AmiLabs\CryptoKit\RPC;

/**
 * Index controller.
 */
class indexController extends Controller {
    /**
     * RPC Client
     */
    protected $oRPC;
    /**
     * Constructor.
     */
    public function __construct(){
        parent::__construct();
        $this->oRPC = new RPC();
        $testnet = (bool)$this->getRequest()->get('testnet');
        $this->getConfig()->set('CryptoKit/testnet', $testnet);
    }
    /**
     * Index action.
     */
    public function actionIndex(){
        $oTpl = $this->getApplication()->getTemplate();
        if($oTpl->exists('ga')){
            $this->oView->set('ga', $oTpl->get('ga'));
        }
    }
    /**
     * Create transaction action.
     */
    public function actionCreateTX(){
        $oRequest = $this->getRequest();
        if($oRequest->getMethod() === 'POST'){
            $oRequest = $this->getRequest();
            // Todo: validation
            $aScope = $oRequest->getScope();
            // Public keys
            $aPubKeys = array();
            foreach($aScope as $field => $value){
                if((strpos($field, 'pubkey') === 0) && $value){
                    $aPubKeys[] = $value;
                }
            }
            $success = FALSE;
            try{
                $res = BlockchainIO::getLayer()->send(
                    $aScope['source'],
                    $aScope['destination'],
                    $aScope['asset'],
                    (int)$aScope['qty'],
                    $aPubKeys
                );
                $success = TRUE;
            }catch(\Exception $e){
                $res = $e->getMessage();
            }
            echo json_encode(array('success' => $success, 'result' => $res));
            die();
        }
    }
    /**
     * Broadcast transaction action.
     */
    public function actionBroadcastTX(){
        $oRequest = $this->getRequest();
        if($oRequest->getMethod() === 'POST'){
            $hex = $oRequest->get('hex', FALSE, INPUT_POST);
            if(FALSE !== $hex){
                $success = FALSE;
                try{
                    $res = BlockchainIO::getLayer()->sendRawTx($hex);
                    $success = TRUE;
                }catch(\Exception $e){
                    $res = $e->getMessage();
                }
                echo json_encode(array('success' => $success, 'result' => $res));
                die();
            }
        }
    }
    /**
     * Check balances.
     */
    public function actionCheckBalance(){
        $oRequest = $this->getRequest();
        if($oRequest->getMethod() === 'POST'){
            $address = $oRequest->get('address', FALSE, INPUT_POST);
            if(FALSE !== $address){
                $success = FALSE;
                try{
                    $res = $this->oRPC->exec(
                        'counterblockd',
                        'get_chain_address_info',
                        array(
                            'with_last_txn_hashes' => 0,
                            'with_uxtos' => FALSE,
                            'addresses' => array($address)
                        )
                    );
                    $success = TRUE;
                }catch(\Exception $e){
                    $res = $e->getMessage();
                }
                echo json_encode(array('success' => $success, 'result' => $res));
                die();
            }
        }
    }

}