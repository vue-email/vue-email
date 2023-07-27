<script lang="ts">
export default { name: 'EContainer' }
</script>

<template>
	<table align="center" width="100%" data-id="__vue-email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 37.5em">
		<tbody>
			<tr style="width: 100%">
				<td>
					<slot></slot>
				</td>
			</tr>
		</tbody>
	</table>
</template>
