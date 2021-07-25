function! skkeleton#get_henkan_str() abort
  let line = getline('.')
  let idx = col('.') - 2
  let henkan_point = strridx(line, '▽', idx)
  if henkan_point == -1
    return ''
  endif
  return line[henkan_point : idx]
endfunction
