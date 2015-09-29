DKApp = {
    page: 'create',
    testnet: false,
    switchPage: function(page){
        if((page != DKApp.page) && $('#page-' + page).length){
            $('#page-' + page).show("slide", { direction: "right" }, 300);
            $('#page-' + DKApp.page).hide("slide", { direction: "left" }, 300);
            $('li[data-page=' + DKApp.page + ']').removeClass('active');
            $('li[data-page=' + page + ']').addClass('active');
            DKApp.page = page;
        }
    },
    updateNetworkButton: function(){
        $('#network').removeClass('btn-success btn-danger');
        $('#network').addClass(DKApp.testnet ? 'btn-danger' : 'btn-success');
        $('#network').text(DKApp.testnet ? 'TESTNET' : 'MAINNET');
    },
    changeNetwork: function(){
        DKApp.testnet = !DKApp.testnet;
        $.cookie('testnet', DKApp.testnet ? 1 : '');
        DKApp.updateNetworkButton();
    },
    addPublicKey: function(){
        $($('.publicKeyRow').not(':visible')[0]).show();
        if($('.publicKeyRow:visible').length > 5){
            $('#addMorePubKeys').hide();
        }
    },
    addPrivateKey: function(){
        $($('.privateKeyRow').not(':visible')[0]).show();
        if($('.privateKeyRow:visible').length > 2){
            $('#addMorePrivKeys').hide();
        }
    },
    addError: function(input, msg){
        input.parent().addClass('has-error');
        input.parent().find('.help-block').remove();
        input.parent().append($('<DIV>').addClass('help-block animation-slideDown').text(msg));
        input.focus();
    },
    satoshiInterval: function(){
        DKApp.invalidQty = true;
        setInterval(function(){
            var qty = parseInt($('#qty').val());
            qty = qty && !isNaN(qty) ? qty : 0;
            if(qty){
                var res = qty / 100000000;
                $('#realQty').text(qty + ' satoshi = ' + res.toFixed(8).replace(/0+$/, ''));
                DKApp.invalidQty = false;
            }else{
                $('#realQty').text('');
            }
        }, 100);
    },
    startup: function(){
        DKApp.testnet = $.cookie('testnet') ? true : false;
        DKApp.updateNetworkButton();
        DKApp.satoshiInterval();
        // Get TX hex from hash
        if($('#hex').length && document.location.hash){
            $('#hex').val(document.location.hash.replace('#', ''));
            document.location.hash = '';
        }
        // Events
        $('#network').click(DKApp.changeNetwork);
        $('#addMorePubKeysBtn').click(DKApp.addPublicKey);
        $('#addMorePrivKeysBtn').click(DKApp.addPrivateKey);
        $('#createBtn').click(DKApp.createTX);
        $('#signBtn').click(DKApp.signTX);
        $('#broadcastBtn').click(DKApp.broadcastTX);
        $('#gotoSignTX').click(function(){DKApp.goto('sign');});
        $('#gotoBroadcastTX').click(function(){DKApp.goto('broadcast');});
        $('#gotoBlockscan').click(DKApp.blockscanView);
        $('#checkBalanceBtn').click(DKApp.checkBalance);
        $('ul.nav li').click(function(){
            var page = $(this).attr('data-page');
            DKApp.switchPage(page);
        });
    },
    createTX: function(){
        $('.has-error').removeClass('has-error');
        $('.help-block').remove();
        var source = $('#source');
        var destination = $('#destination');
        var asset = $('#asset');
        var hasErrors = !source.val() || !destination.val() || !asset.val() || DKApp.invalidQty;
        if(!source.val()){
            DKApp.addError(source, 'Enter source address');
        }
        var destination = $('#destination');
        if(!destination.val()){
            DKApp.addError(destination, 'Enter destination address');
        }
        var asset = $('#asset');
        if(!asset.val()){
            DKApp.addError(asset, 'Enter asset name');
        }
        if(!DKApp.invalidQty){
            var qty = parseInt($('#qty').val());
        }else{
            DKApp.addError($('#qty'), 'Invalid quantity value');
        }
        if(!hasErrors){
            $('#createBtn').hide();
            $('#create-spinner').show();
            $.post(
                '/createTX',
                {
                    _: new Date().getTime(),
                    source: source.val(),
                    destination: destination.val(),
                    asset: asset.val(),
                    qty: qty,
                    pubkey1: $('#pubkey1').val(),
                    pubkey2: $('#pubkey2').val(),
                    pubkey3: $('#pubkey3').val(),
                    pubkey4: $('#pubkey4').val(),
                    pubkey5: $('#pubkey5').val(),
                    pubkey6: $('#pubkey6').val()
                },
                function(data){
                    $('.legend').hide();
                    $('#createBtn').show();
                    $('#create-spinner').hide();
                    var err = false;
                    try{
                        data = JSON.parse(data);
                        if(data.success){
                            DKApp.showResponse(data.result);
                        }else{
                            err = data.result;
                        }
                    }catch(e){
                        err = data;
                    }
                    if(err){
                        DKApp.showResponse(err, true);
                    }
                }
            );
        }
    },
    signTX: function(){
        $('.has-error').removeClass('has-error');
        $('.help-block').remove();
        var hex = $('#sign-hex');
        var privkey1 = $('#privkey1');
        var hasErrors = !hex.val() || !privkey1.val();
        if(!hex.val()){
            DKApp.addError(hex, 'Enter transaction raw hex');
        }
        if(!privkey1.val()){
            DKApp.addError(privkey1, 'Enter private key');
        }
        if(!hasErrors){
            $('#signBtn').hide();
            $('#sign-spinner').show();
            try {
                var hex = hex.val();
                var privateKey1 = $('#privkey1').val();
                var privateKey2 = $('#privkey2').val();
                var privateKey3 = $('#privkey3').val();
                var sourceTx = Bitcoin.Transaction.fromHex(hex);
                var txBuilder = Bitcoin.TransactionBuilder.fromTransaction(sourceTx);
                var keyPair1 = Bitcoin.ECKey.fromWIF(privateKey1);
                txBuilder.sign(0, keyPair1, sourceTx.ins[0].script);
                if(privateKey2){
                    var keyPair2 = Bitcoin.ECKey.fromWIF(privateKey2);
                    txBuilder.sign(0, keyPair2, sourceTx.ins[0].script);
                }
                if(privateKey3){
                    var keyPair2 = Bitcoin.ECKey.fromWIF(privateKey2);
                    txBuilder.sign(0, keyPair2, sourceTx.ins[0].script);
                }
                var signedTx = txBuilder.buildIncomplete();
                var newHex = signedTx.toHex();
                DKApp.showResponse(newHex);
            }catch(e){
                DKApp.showResponse(e.toString(), true);
            }
            $('#signBtn').show();
            $('#sign-spinner').hide();
        }
    },
    broadcastTX: function(){
        $('.has-error').removeClass('has-error');
        $('.help-block').remove();
        var hex = $('#broadcast-hex');
        var hasErrors = !hex.val();
        if(!hex.val()){
            DKApp.addError(hex, 'Enter signed transaction raw hex');
        }
        if(!hasErrors){
            $('#broadcastBtn').hide();
            $('#broadcast-spinner').show();
            $.post(
                '/broadcastTX',
                {
                    _: new Date().getTime(),
                    hex: hex.val()
                },
                function(data){
                    $('#broadcastBtn').show();
                    $('#broadcast-spinner').hide();
                    try{
                        var error = false;
                        var errMsg = '';
                        data = JSON.parse(data);
                        if(data.success){
                            DKApp.showResponse(data.result);
                        }else{
                            error = true;
                            errMsg = data.result;
                        }
                    }catch(e){
                        error = true;
                        errMsg = data;
                    }
                    if(error){
                        if(!errMsg){
                            errMsg = 'Unknown error';
                        }
                        DKApp.showResponse(errMsg, true);
                    }
                }
            );
        }
    },
    checkBalance: function(){
        $('.has-error').removeClass('has-error');
        $('.help-block').remove();
        var address = $('#address-balance');
        var hasErrors = !address.val();
        if(!address.val()){
            DKApp.addError(address, 'Enter BTC address');
        }
        if(!hasErrors){
            $('#checkBalanceBtn').hide();
            $('#balance-spinner').show();
            $.post(
                '/checkBalance',
                {
                    _: new Date().getTime(),
                    address: address.val()
                },
                function(data){
                    $('#checkBalanceBtn').show();
                    $('#balance-spinner').hide();
                    try{
                        var error = false;
                        var errMsg = '';
                        data = JSON.parse(data);
                        if(data.success){
                            if(data.result && data.result[0] && data.result[0].info){
                                DKApp.showResponse({
                                    balance: data.result[0].info.balance,
                                    uncomfirmed: data.result[0].info.unconfirmedBalance,
                                });
                            }else{
                                DKApp.showResponse(data.result);
                            }
                        }else{
                            error = true;
                            errMsg = data.result;
                        }
                    }catch(e){
                        error = true;
                        errMsg = data;
                    }
                    if(error){
                        if(!errMsg){
                            errMsg = 'Unknown error';
                        }
                        DKApp.showResponse(errMsg, true);
                    }
                }
            );
        }
    },
    blockscanView: function(){
        var hash = $('.result-success:visible pre').text();
        window.location.href = 'http://blockscan.com/tx?txhash=' + hash;
    },
    showResponse: function(message, isError){
        if('object' === typeof(message)){
            message = JSON.stringify(message, null, 4);
        }
        if(typeof(isError) === 'undefined'){
            isError = false;
        }
        var hide = isError ? 'success' : 'error';
        var show = isError ? 'error' : 'success';
        $('#page-' + DKApp.page + ' .result-' + hide).hide();
        $('#page-' + DKApp.page + ' .result-' + show + ' pre').html(message);
        $('#page-' + DKApp.page + ' .result-' + show).show();            
    },
    goto: function(where){
        var hex = $('.result-success:visible pre').text();
        $('#' + where + '-hex').val(hex);
        $('#page-' + where + ' .result-success').hide();
        $('#page-' + where + ' .result-error').hide();
        DKApp.switchPage(where);
    }
};
$(document).ready(DKApp.startup);