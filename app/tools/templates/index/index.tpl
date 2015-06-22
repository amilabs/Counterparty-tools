<div id="page-create" class="page">
    <h1>Create Transaction</h1>
    <div class="row">
        <div class="alert alert-info col-xs-6">
            <div class="row">
                <div class="col-xs-12">
                    Source address:<br />
                    <input type="text" class="input-lg form-control" value="" id="source" placeholder="Bitcoin address or Counterparty multisig address">
                </div>
            </div>
            <div class="row padding-top-10">
                <div class="col-xs-12">
                    Destination address:<br />
                    <input type="text" class="input-lg form-control" value="" id="destination" placeholder="Bitcoin address or Counterparty multisig address">
                </div>
            </div>    
            <div class="row padding-top-10">
                <div class="col-xs-12">
                    Asset name:<br />
                    <input type="text" class="input-lg form-control" value="" id="asset" placeholder="Use BTC for Bitcoins">
                </div>
            </div>    
            <div class="row padding-top-10">
                <div class="col-xs-12">
                    Quantity:<br />
                    <input type="text" class="input-lg form-control" value="" id="qty" placeholder="In satoshi for BTC and divisible assets">
                </div>
            </div>
            <div class="row padding-top-10 publicKeyRow">
                <div class="col-xs-12">
                    Public Key 1:<br />
                    <input type="text" class="input-lg form-control" value="" id="pubkey1" placeholder="Required if not already published in the Blockchain">
                </div>
            </div>
            <div class="row padding-top-10 publicKeyRow">
                <div class="col-xs-12">
                    Public Key 2:<br />
                    <input type="text" class="input-lg form-control" value="" id="pubkey2" placeholder="Required if not already published in the Blockchain">
                </div>
            </div>
            <div class="row padding-top-10 publicKeyRow" style="display:none;">
                <div class="col-xs-12">
                    Public Key 3:<br />
                    <input type="text" class="input-lg form-control" value="" id="pubkey3" placeholder="Required if not already published in the Blockchain">
                </div>
            </div>
            <div class="row padding-top-10 publicKeyRow" style="display:none;">
                <div class="col-xs-12">
                    Public Key 4:<br />
                    <input type="text" class="input-lg form-control" value="" id="pubkey4" placeholder="Required if not already published in the Blockchain">
                </div>
            </div>
            <div class="row padding-top-10 publicKeyRow" style="display:none;">
                <div class="col-xs-12">
                    Public Key 5:<br />
                    <input type="text" class="input-lg form-control" value="" id="pubkey5" placeholder="Required if not already published in the Blockchain">
                </div>
            </div>
            <div class="row padding-top-10 publicKeyRow" style="display:none;">
                <div class="col-xs-12">
                    Public Key 6:<br />
                    <input type="text" class="input-lg form-control" value="" id="pubkey6" placeholder="Required if not already published in the Blockchain">
                </div>
            </div>
            <div class="row padding-top-10" id="addMorePubKeys">
                <div class="col-xs-12 text-right">
                    <a style="cursor:pointer;" id="addMorePubKeysBtn">+ add public key</a>
                </div>
            </div>
            <div class="row padding-top-10">
                <div class="col-xs-6" id="realQty"></div>
                <div class="col-xs-6 text-right">
                    <button class="btn btn-lg btn-success" id="createBtn">Create</button>
                </div>
            </div>
        </div>
        <div class="col-xs-1 text-center" style="margin-top: 100px;">
            <i id="create-spinner" class="spinner fa fa-cog fa-3x fa-spin"></i>
        </div>
        <div class="legend alert alert-success col-xs-5">
            <h4>Counterparty online tools</h4>
            Create, sign, and broadcast multisignature transactions with Counterparty Assets or bitcoins.<br /><br />
            Operates with Mainnet and Testnet. Sources available.<br /><br />
            Look more at <a href="https://medium.com/ami-labs">AmiLabs blog</a>.
        </div>
        <div class="result-success alert alert-success col-xs-5">
            <b>RESULT:</b><br>
            <pre></pre>
            <button class="btn btn-lg btn-success" id="gotoSignTX">Sign TX</button>
        </div>
        <div class="result-error alert alert-danger col-xs-5">
            <b>ERROR:</b><br>
            <pre></pre>
        </div>
    </div>
</div>
<div id="page-sign" class="page">
    <h1>Sign Transaction</h1>
    <div class="row">
        <div class="alert alert-info col-xs-6">
            <div class="row">
                <div class="col-xs-12">
                    Transaction raw hex:
                    <textarea class="form-control input-lg" rows="5" id="sign-hex"></textarea>
                </div>
            </div>
            <div class="row padding-top-10 privateKeyRow">
                <div class="col-xs-12">
                    Private Key 1:<br />
                    <input type="text" class="input-lg form-control" value="" id="privkey1" placeholder="">
                </div>
            </div>
            <div class="row padding-top-10 privateKeyRow" style="display:none;">
                <div class="col-xs-12">
                    Private Key 2:<br />
                    <input type="text" class="input-lg form-control" value="" id="privkey2" placeholder="">
                </div>
            </div>
            <div class="row padding-top-10 privateKeyRow" style="display:none;">
                <div class="col-xs-12">
                    Private Key 3:<br />
                    <input type="text" class="input-lg form-control" value="" id="privkey3" placeholder="">
                </div>
            </div>
            <div class="row padding-top-10" id="addMorePrivKeys">
                <div class="col-xs-12 text-right">
                    <a style="cursor:pointer;" id="addMorePrivKeysBtn">+ add private key</a>
                </div>
            </div>
            <div class="row padding-top-10">
                <div class="col-xs-12 text-right">
                    <button class="btn btn-lg btn-success" id="signBtn">Sign</button>
                </div>
            </div>
        </div>
        <div class="col-xs-1 text-center" style="margin-top: 100px;">
            <i id="sign-spinner" class="spinner fa fa-cog fa-3x fa-spin"></i>
        </div>
        <div class="result-success alert alert-success col-xs-5">
            <b>RESULT:</b><br>
            <pre></pre>
            <button class="btn btn-lg btn-success" id="gotoBroadcastTX">Broadcast TX</button>
        </div>
        <div class="result-error alert alert-danger col-xs-5">
            <b>ERROR:</b><br>
            <pre></pre>
        </div>
    </div>
</div>
<div id="page-broadcast" class="page">
    <h1>Broadcast Transaction</h1>
    <div class="row">
        <div class="alert alert-info col-xs-6">
            <div class="row">
                <div class="col-xs-12">
                    Transaction raw hex:
                    <textarea class="form-control input-lg" rows="5" id="broadcast-hex"></textarea>
                </div>
            </div>
            <div class="row padding-top-10">
                <div class="col-xs-12 text-right">
                    <button class="btn btn-lg btn-success" id="broadcastBtn">Broadcast</button>
                </div>
            </div>
        </div>
        <div class="col-xs-1 text-center" style="margin-top: 100px;">
            <i id="broadcast-spinner" class="spinner fa fa-cog fa-3x fa-spin"></i>
        </div>
        <div class="result-success alert alert-success col-xs-5">
            <b>RESULT:</b><br>
            <pre></pre>
            <button class="btn btn-lg btn-success" id="gotoBlockscan">View on BlockScan</button>
        </div>
        <div class="result-error alert alert-danger col-xs-5">
            <b>ERROR:</b><br>
            <pre></pre>
        </div>
    </div>
</div>
