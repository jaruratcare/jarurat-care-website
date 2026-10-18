<script>
	import Colon from "$lib/svg/colon.svelte";


export let image ;
export let name;
export let about;
export let position;

</script>

<div class="bg-white rounded-2xl flex flex-col justify-center gap-6 pl-8 pt-14  pr-14 pb-24 shadow-md">
    <div class="flex justify-between ">
        <div class="flex gap-7">
            <div><img src={image} alt="Profile photo of {name}, {position}"></div>
            <div> 
                <div>{name}</div>
                <div>{position}</div>
            </div>
        </div>
        <div class="w-8 h-8"><Colon/></div>
    </div>
    <div>{about}</div>
</div>