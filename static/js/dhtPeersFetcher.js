$(window).load(function() {
  var peersTd    = $('table td.peers');
  var total      = peersTd.length;
  var totalDone  = 0;

  function fetch(td) {
    var hash = $(td).data('hash')
    $.get( "/dht-peers?hash=" + hash, function(result) {
      $(td).text(result.peers);
      totalDone++;
      next();
    });
  }

  function next() {
    updateProgress(total, totalDone);
    if (totalDone < total) {
      fetch(peersTd[totalDone]);
    }
  }

  if (total > 0) next();
})

function updateProgress(total, totalFound) {
  var percentage     = Math.ceil(totalFound / (total / 100));
  var percentageText = percentage + '%';

  $('div.progress-bar').css('width', percentageText);
  $('div.progress-bar span').text(percentageText + ' Complete');
  if (percentage == 100) {
    $('div.progress-bar').removeClass('active')
  }
}