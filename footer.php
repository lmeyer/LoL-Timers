<footer>
    Brought to you by <a href="http://www.ludovicmeyer.com">Ludovic Meyer</a> and <a href="http://www.pixel-cookers.com">Pixel Cookers</a> | Hosted by <a href="https://github.com/lmeyer/LoL-Timers">Github</a> | <a data-toggle="modal" href="#helpModal" href="">Help</a> | <a data-toggle="modal" href="#commentModal" href="">Comments</a>
    <br />
    <span id="connected">0</span> connected | <a data-toggle="modal" href="#syncModal" href="">Synchronize map</a> &nbsp;&nbsp; - &nbsp;&nbsp; <a href="./">5v5</a> | <a href="./3v3">3v3</a>
</footer>

<div class="modal fade" id="helpModal">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">×</a>
        <h3>Help</h3>
    </div>
    <div class="modal-body">
        <h2>How it works ?</h2>
        <h3>Monsters</h3>
        <p>Click on a monster icon when you kill him. You will start a countdown timer that will indicate you when the monster will be up again.<br />In order to help you, the icon will pulsate during the last 5 seconds.</p>
        <p>Right click on a monster will remove the timer.</p>
        <h3>Wards</h3>
        <ol>
            <li>If you click on the map, you will create where you clicked a ward with a countdown timer</li>
            <li>If you click on a green ward, you will create a pink ward</li>
            <li>If you click on a pink ward, you will create a blue (explorer) ward</li>
            <li>If you click on a blue ward, you will remove the ward</li>
        </ol>
        <h3>Sounds</h3>
        <p>A sound control is available at the top right of the map. Your choice is saved in a Cookie.</p>
    </div>
    <div class="modal-footer">
        <a href="#" data-dismiss="modal" class="btn">Close</a>
    </div>
</div>

<div class="modal fade" id="syncModal">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">×</a>
        <h3>Map synchronization <small>(Beta)</small></h3>
    </div>
    <div class="modal-body">
        <h2>How it works ?</h2>
        <p>Generate a custom link with the button bellow.</p>
        <p>Click on it to create a new lol-timers instance. <strong>Share this url with your teammates</strong>.</p>
        <p>You can see how many users are connected to the current instance at the bottom of the page.</p>

        <div class="well">
            <button class="btn btn-info" type="button" id="generate-sync-url">Generate</button>
            <a id="sync-url" class="hide"></a>
            <div id="private-instance" class="hide">
                <p>You are currently in a private instance. Please return to <a href="http://lol-timers.com">http://lol-timers.com</a> if you want to create another one.</p>
            </div>
        </div>
        <h3>Current instance QRCode</h3>
        <p>Flash it with your smartphone.</p>
        <div class="well">
            <div id="qrcode"></div>
            <div id="qrcode-public" class="hide">
                You are in the public instance. Please generate a private one and go in it.
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#" data-dismiss="modal" class="btn">Close</a>
    </div>
</div>

<div class="modal fade" id="commentModal">
    <div class="modal-body">
        <div id="disqus_thread"></div>
        <script type="text/javascript">
            /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
            var disqus_shortname = 'loltimers'; // required: replace example with your forum shortname

            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
        </script>
        <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>

    </div>
    <div class="modal-footer">
        <a href="#" data-dismiss="modal" class="btn">Close</a>
    </div>
</div>

<audio class="sounds" id="timesup" preload="auto">
    <source type="audio/ogg" src="sounds/timesup.ogg"/>
    <source type="audio/mp3" src="sounds/timesup.mp3"/>
</audio>
<audio class="sounds" id="warddown" preload="auto">
    <source type="audio/ogg" src="sounds/warddown.ogg"/>
    <source type="audio/mp3" src="sounds/warddown.mp3"/>
</audio>
<audio class="sounds" id="wardup" preload="auto">
    <source type="audio/ogg" src="sounds/wardup.ogg"/>
    <source type="audio/mp3" src="sounds/wardup.mp3"/>
</audio>
<audio class="sounds" id="join" preload="auto">
    <source type="audio/ogg" src="sounds/join.ogg"/>
    <source type="audio/mp3" src="sounds/join.mp3"/>
</audio>

<script src="//oss.maxcdn.com/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="//oss.maxcdn.com/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
<script src="js/bootstrap-modal.js"></script>
<script src="js/bookmark-bubble.js"></script>
<script src="js/jquery.pulsate.js"></script>
<script src="js/jquery.plugin.min.js"></script><script src="js/jquery.countdown.min.js"></script>
<script src="js/jquery.rightClick.js"></script>
<script src="js/jquery.cookie.js"></script>
<script src="js/qrcode.min.js"></script>
<script src="/nodeserver/socket.io/socket.io.js"></script>
<script src="js/script.js"></script>
