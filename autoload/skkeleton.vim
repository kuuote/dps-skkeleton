function! s:getlinepos() abort
  if mode() ==# 'i'
    return [getline('.'), col('.') - 2]
  else
    return [getcmdline(), getcmdpos() - 2]
  endif
endfunction

function! skkeleton#get_henkan_str() abort
  let [line, idx] = s:getlinepos()
  let henkan_point = strridx(line, '▽', idx)
  if henkan_point == -1
    return ''
  endif
  return line[henkan_point : idx]
endfunction
