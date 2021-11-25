export default function genAPIEndpoint(address, type, token, engine, folder, secret) {

    const apiVersion = "/v1/";
    const NamespaceSuffix = 'sys/internal/ui/namespaces';
    const EngineSuffix = 'sys/mounts';
    const SecretListSuffix = "metadata";
    const SecretSuffix = "data";

    switch (type) {
        // case "namespace":
        //     if (path === '/') {
        //         return {
        //             address: vaultAddress + apiVersion + NamespaceSuffix,
        //             headers: { 'X-Vault-Token': token }
        //         }
        //     } else {
        //         return {
        //             // address: vaultAddress + apiVersion + path.replace(/\/+$/g, '') + '/' + NamespaceSuffix,
        //             address: vaultAddress + apiVersion + path + NamespaceSuffix,
        //             headers: { 'X-Vault-Token': token }
        //         }
        //     }
        case "engine":
            return {
                address: address + apiVersion + EngineSuffix,
                headers: { 'X-Vault-Token': token }
            }
        case "secretList":
            return {
                address: address + apiVersion + engine + SecretListSuffix + folder,
                headers: { 'X-Vault-Token': token }
            }
        case "secret":
            return {
                // address: vaultAddress + apiVersion + path.replace(/\/+$/g, '') + '/' + SecretSuffix,
                address: address + apiVersion + engine + SecretSuffix +  folder +  secret,
                headers: {
                    'X-Vault-Token': token,
                }
            }

        case "OIDC":
            return {
                address: address + apiVersion + 'auth/oidc/oidc/auth_url',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "redirect_uri": address + "/ui/vault/auth/oidc/oidc/callback", "role": null }),
            }
            
        case "folder":

                return {
                    // address: vaultAddress + apiVersion + path.replace(/\/+$/g, '') + '/' + SecretSuffix,
                    address: address + apiVersion + engine + SecretListSuffix + '/' + folder,
                    headers: {
                        'X-Vault-Token': token,
                    }
                
            }
        default:
            console.log('Invalid Endpoint Type');
            break;
    }
}