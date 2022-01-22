export function generateNav(token, isAdmin) {
  var res = [
    {
      route: '/',
      name: 'Home',
    },
    {
      route: '/auth',
      name: 'Sign in',
    },
    {
      route: '/reg',
      name: 'Sign up',
    }
  ]
  
  if (token != null)
  {
    res.push({
      route: '/trash',
      name: 'Trash bin',
    })
  
    if (isAdmin === 'True')
    res.push({
      route: '/admin/photo',
      name: 'Admin page',
    })
  
    var i = res.findIndex(({ name }) => name === 'Sign in');
    res[i] = {
      route: '/authorWorks',
      name: 'Author Works'
    }
  
    i = res.findIndex(({ name }) => name === 'Sign up');
    res[i] = {
      route: '/authorAccount',
      name: 'Account'
    }
  
    res.push({
      route: '/exit',
      name: 'Log out'
    })
  }

  return res;
}