# Identity On Chain

## [Reputation](https://github.com/Web3-Builders-Alliance/user_profile_standard/tree/main/programs/reputation)

### Reputation based identity standard

Some applications online will require some kind of validation that the address being used
to access meets a certain criteria  example criteria:
 <ol>
    <li>Check if an address belongs to a human being</li>
    <li>Check if a person is a member of a group</li>
    <li>Check if a address can be trusted for a certain onchain activity</li>
 </ol>

Different applications require different levels of trust and methods of gaining the necessary trust.
Reputation is a program that creates an account where a address can link all of their different 
sources.
Applications then have a central place to look for all the attributes they require before granting
access.

## [network](https://github.com/Web3-Builders-Alliance/user_profile_standard/tree/main/programs/network) 
Network is a program which workd with reputation as a reputation source.
With network a user creates an account which is verified by web2 OAuth and Captcha.
A user then gets reputation by being taged by other people he meets who are using network.
Suppose you meet a person at a party who uses network they can tag you whic is essentially saying
yea I know you you are a real person. 


## [user_profile_standard](https://github.com/Web3-Builders-Alliance/user_profile_standard/tree/main/programs/user_profile_standard) 
Suppose you want to store some user information privately onchain, information that is
private but not necessarily of any security risk. Things like links to social media,
profile pictures, maybe nationality , gender , education ... basic profile infomation. 

If we deploy a single program online, then the program becomes one big candy store for
all user profiles. 
What if we deploy a simple program for every user.
We can then make a program that can read specific fields from those accounts without
showing the other fields called [privacy wrapper](https://github.com/Web3-Builders-Alliance/user_profile_standard/tree/main/programs/privacy_wrapper) 




