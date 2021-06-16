function checkaddress() {
    chrome.storage.local.get(["address"], function(e) {
        null != e.address && ($("#wrapper").hide(), $("#wrapper2").show())
    })
}
$(function() {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, function(e) {
        chrome.storage.local.get(["address"], function(e) {
            null != e.address && $("#form_wrapper").hide()
        });
        let r = e[0].url;
        r.includes("https://twitter.com/") && r.includes("/status/") ? chrome.storage.local.get(["address"], function(e) {
            null != e.address && ($("#wrapper").hide(), $("#wrapper2").show())
        }) : ($("#form_wrapper").hide(), $("#wrapper").append("<p>Navigate to the specific tweet you want to archive</p>"), $("#wrapper2").hide()), $("#send_btn").click(function() {
            return $(".message").remove(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function(e) {
                e[0].url.split("/status/")[1].trim();
                let r = $("#id").val();
                chrome.storage.local.set({
                    address: r
                }, function() {
                    console.log("Address is set to " + r), checkaddress()
                })
            }), !1
        }), $("#success_btn").click(function() {
            chrome.storage.local.get(["hash"], function(e) {
                var r = "https://polygonscan.com/tx/" + e.hash;
                window.open(r, "_blank")
            })
        }), $("#mint_btn").click(function() {
            return $(".message").remove(), $("#wrapper2").hide(), $("#wrapper3").show(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function(e) {
                let r = e[0].url.split("/status/")[1].trim();
                chrome.storage.local.get(["address"], function(e) {
                    var t = "https://us-central1-matic-services.cloudfunctions.net/chrome?id=" + e.address + "&tweetid=" + r;
                    $.ajax({
                        url: t,
                        type: "GET",
                        dataType: "json",
                        success: function(e) {
                            if ($("#wrapper3").hide(), "success" == e.status) {
                                $("#wrapper4").show();
                                var r = e.hash;
                                chrome.storage.local.set({
                                    hash: r
                                })
                            } else $("#wrapper6").show()
                        },
                        error: function(e, r, t) {
                            $("#wrapper3").hide(), $("#wrapper5").show()
                        }
                    })
                })
            }), !1
        })
    })
});
