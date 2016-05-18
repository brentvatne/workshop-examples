export default (anim, config) => {
  config = config || {};

  return {
    onMouseDown: function(event) {
      anim.stopAnimation(startValue => {
        config.onStart && config.onStart();
        var startPosition = event.clientX;
        var lastTime = Date.now();
        var lastPosition = event.clientX;
        var velocity = 0;

        function updateVelocity(event) {
          var now = Date.now();
          if (event.clientX === lastPosition || now === lastTime) {
            return;
          }
          velocity = (event.clientX - lastPosition) / (now - lastTime);
          lastTime = now;
          lastPosition = event.clientX;
        }

        var moveListener, upListener;

        window.addEventListener('mousemove', moveListener = (event) => {
          var value = startValue + (event.clientX - startPosition);
          anim.setValue(value);
          updateVelocity(event);
        });

        window.addEventListener('mouseup', upListener = (event) => {
          updateVelocity(event);
          window.removeEventListener('mousemove', moveListener);
          window.removeEventListener('mouseup', upListener);
          config.onEnd && config.onEnd({velocity});
        });
      });
    }
  }
};
