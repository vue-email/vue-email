<script lang="ts">
export default { name: 'ERow' }
</script>

<template>
	<table align="center" width="100%" data-id="__vue-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
		<tbody style="width: 100%">
			<tr style="width: 100%">
				<slot></slot>
			</tr>
		</tbody>
	</table>
</template>
