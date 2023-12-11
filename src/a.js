<span
className="p-2 text-md"
style={{
  wordBreak: 'break-all',
  overflowWrap: 'break-word',
  overflow: 'scroll',
}}
>
{typeof fieldValue === 'object'
  ? JSON.stringify(fieldValue, null, 2)
  : fieldValue}
</span>

{Object.entries(fieldValue)
  .filter(
   ([key, value]) =>
     key !== 'valueType'
 )
 .map((keypair,valuepair),valueIndex)=>(
  <div key={valueIndex}>
    <span>{valuepair}</span>
  </div>
 )
 }