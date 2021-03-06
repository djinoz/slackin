
import dom from 'vd';

export default function splash({ name, logo, active, total, channels, iframe }){
  let div = dom('','<h1>Xamarin Evolve</h1>',
    '<h2>Share session notes and chat with others attendees.</h2>',
    dom('.splash',
    !iframe && dom('.logos',
      logo && dom('.logo.org'),
      dom('.logo.slack')
    ),
    dom( 'Join ', dom('b', name),
      // mention single single-channel inline
      channels && channels.length === 1 && dom('span', ' #', channels[0]),
      ' on Slack.'
    ),
    dom('p.status',
      active
        ? [
          dom('b.active', active), ' users online now of ',
          dom('b.total', total), ' registered.'
        ]
        : [dom('b.total', total), ' users are registered so far.']
    ),
    dom('form',
      // channel selection when there are multiple
      channels && channels.length > 1 && dom('select.form-item name=channel',
        channels.map(channel => {
          return dom('option', { value: channel, text: channel });
        })
      ),
      dom('input.form-item type=email placeholder=you@yourdomain.com '
        + (!iframe ? 'autofocus' : '')),
      dom('button.loading', 'Get my Invite')
    ),
    !iframe && dom('footer',
      '<h2>Created by</h2> \
      <a href="http://streethawk.com/evolve/" target="_blank"><img style="width:60%" src="https://dashboard.streethawk.com/dashboard/public/img/global/2015-sh-logo.png"/></a> \
      <p>Ridiculously simple App user engagement for Xamarin. ',
      dom('a href=http://streethawk.com/evolve/ target=_blank', 'Learn more...')
    ),
    style({ logo, active, iframe }),
    // xxx: single build
    dom('script src=https://cdn.socket.io/socket.io-1.3.2.js'),
    dom('script src=/assets/superagent.js'),
    dom('script src=/assets/client.js')
  ));
  return div;
}

const pink = '#E01563';
const hawk = '#652e91';

function style({ logo, active, iframe } = {}){
  var css = dom.style();

  css.add('.splash', {
    'width': iframe ? '250px' : '300px',
    'margin': iframe ? '0' : '50px auto',
    'text-align': 'center',
    'font-family': '"Helvetica Neue", Helvetica, Arial'
  });

  if (iframe) {
    css.add('body, html', {
      'margin': '0',
      'padding': '0',
      'background': '#FAFAFA',
      'overflow': 'hidden' // ff
    });

    css.add('.splash', {
      'box-sizing': 'border-box',
      'padding': '10px'
    });
  }

  if (!iframe) {
    css
    .media('(max-width: 500px)')
    .add('.splash', {
      'margin-top': '100px'
    });
  }

  css.add('.head', {
    'margin-bottom': '40px'
  });

  css.add('.logos', {
    'position': 'relative',
    'margin-bottom': '40px'
  });

  if (!iframe) {
    css.add('.logo', {
      'width': '48px',
      'height': '48px',
      'display': 'inline-block',
      'background-size': 'cover'
    });

    css.add('.logo.slack', {
      'background-image': 'url(/assets/slack.svg)'
    });

    if (logo) {
      let pw = 10; // '+' width
      let lp = 30; // logos separation

      css.add('.logo.org::after', {
        'position': 'absolute',
        'display': 'block',
        'content': '"+"',
        'top': '15px',
        'left': '0',
        'width': '300px',
        'text-align': 'center',
        'color': '#D6D6D6',
        'font': '15px Helvetica Neue'
      });

      css.add('.logo.org', {
        'background-image': `url(${logo})`,
        'margin-right': `${lp + pw + lp}px`
      });
    }
  }

  css.add('p', {
    'font-size': iframe ? '12px' : '15px',
    'margin': iframe ? '0 0 5px' : '5px 0'
  });

  if (iframe) {
    css.add('p.status', {
      'font-size': '11px'
    });
  }

  css.add('select', {
    'background': 'none'
  });

  css.add('button, .form-item', {
    'font-size': '12px',
    'height': '32px',
    'line-height': '32px',
    'margin-top': iframe ? '5px' : '10px',
    'vertical-align': 'middle',
    'display': 'block',
    'text-align': 'center',
    'box-sizing': 'border-box',
    'width': '100%'
  });

  css.add('button', {
    'color': '#fff',
    'font-weight': 'bold',
    'border-width': 0,
    'background': hawk,
    'text-transform': 'uppercase',
    'cursor': 'pointer',
    'appearence': 'none',
    '-webkit-appearence': 'none',
    'padding': '0',
    'outline': '0',
    'transition': 'background-color 150ms ease-in, color 150ms ease-in'
  });

  css.add('button.loading', {
    'pointer-events': 'none'
  });

  css.add('button:disabled', {
    'color': '#9B9B9B',
    'background-color': '#D6D6D6',
    'cursor': 'default',
    'pointer-events': 'none'
  });

  css.add('button.error', {
    'background-color': '#F4001E'
  });

  css.add('button.success:disabled', {
    'color': '#fff',
    'background-color': '#68C200'
  });

  css.add('button:not(.disabled):active', {
    'background-color': '#7A002F',
  });

  css.add('b', {
    'transition': 'transform 150ms ease-in'
  });

  css.add('b.grow', {
    'transform': 'scale(1.3)'
  });

  css.add('form', {
    'margin-top': iframe ? '10px' : '20px',
    'margin-bottom': '0'
  });

  css.add('input', {
    'color': '#9B9B9B',
    'border': '1px solid #D6D6D6'
  });

  if (iframe) {
    css.add('input, button', {
      'font-size': '11px',
      'height': '28px',
      'line-height': '28px'
    });
  }

  css.add('input:focus', {
    'color': '#666',
    'border-color': '#999',
    'outline': '0'
  });

  if (active) {
    css.add('.active', {
      'color': hawk,
    });
  }

  if (!iframe) {
    css.add('footer', {
      'color': '#D6D6D6',
      'font-size': '11px',
      'margin': '50px auto 0',
      'width': '300px',
      'text-align': 'center',
    });

    css.add('h1', {
      'color': hawk,
      'text-decoration': 'none',
      'font-family': '"Helvetica Neue", Helvetica, Arial',
      'width': '80%',
      'text-align': 'center',
      'margin': '1rem auto',
    });
    css.add('h2', {
      'color': hawk,
      'font-size': '1rem',
      'text-decoration': 'none',
      'font-family': '"Helvetica Neue", Helvetica, Arial',
      'width': '80%',
      'text-align': 'center',
      'margin': '1rem auto',
    });

    css.add('footer a', {
      'color': '#9B9B9B',
      'text-decoration': 'none',
    });

    css.add('footer a:hover', {
      'color': '#fff',
    });
  }

  return css;
}
